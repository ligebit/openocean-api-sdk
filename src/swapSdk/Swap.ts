import { api } from "../api";
import { ReqSwapVo } from "../api/vo/RequestVo";
import { chains } from "../config/Chains";
import { Transaction } from "@solana/web3.js";
import { LCDClient, MsgExecuteContract } from "@terra-money/terra.js";

const axios = require('axios');
const bs58 = require("bs58");

export { ReqSwapVo }
export class Swap {
  private errorCallback: Function = () => { }
  private transactionHashCallback: Function = () => { }
  private receiptCallback: Function = () => { }
  private successCallback: Function = () => { }
  contract: any
  option: ReqSwapVo
  res: any
  wallet: any
  chain: any

  constructor(option: ReqSwapVo) {
    this.option = option
  }
  async send(wallet: any, chain: any) {
    this.wallet = wallet
    this.chain = chain
    let data = await api.swap(this.option)
    if (data.code != 200) {
      this.errorCallback(data.error)
      return this
    }
    this.res = data.data
    switch (chain.compiler) {
      case 'EVM':
        this.sendEthTransaction()
        break
      case 'SOL':
        this.sendSolanaTransaction()
        break
      case 'TRON':
        this.sendTronTransaction()
        break
      case 'TERRA':
        this.sendTerraTransaction()
        break
    }
    return this
  }
  async sendSolanaTransaction() {

    const res = this.res;
    try {
      const transaction: any = Transaction.from(Buffer.from(res.transaction, "hex"));
      let signed: any = null;
      let signature: any = null;


      if (this.wallet.sdk.isCoin98) {
        const result = await this.wallet.sdk.request({
          method: 'sol_sign',
          params: [transaction]
        });
        console.log("Got signature, submitting transaction");
        const bytes = bs58.decode(result.signature);
        transaction.signatures[0].signature = bytes;
        transaction.feePayer = this.wallet.customPublicKey;
        signed = transaction;
      } else if (this.wallet.sdk.isSlopeWallet) {
        const { msg, data } = await this.wallet.sdk.signTransaction(bs58.encode(transaction.serializeMessage()))
        if (msg !== 'ok') return;
        const bytes = bs58.decode(data.signature);
        transaction.signatures[0].signature = bytes;
        transaction.feePayer = this.wallet.customPublicKey;
        signed = transaction;
      } else {
        signed = await this.wallet.sdk.signTransaction(transaction);
      }

      signature = await this.wallet.connection.sendRawTransaction(
        signed.serialize({ requireAllSignatures: false })
      );
      // this.receiptCallback(signature)
      this.transactionHashCallback(signature)

      // transactions.add(state.walletType, signature, res);
      // setTimeout(async () => {
      //   try {
      //     await axios.post(
      //       `https://market-api.openocean.finance/v1/data/scan_solana`,
      //       {
      //         // from: res.fromIds,
      //         from: this.wallet.address,
      //         hash: signature,
      //       }
      //     );
      //     this.successCallback(signature)
      //   } catch (e) {
      //     console.log("", e);
      //     this.errorCallback(e)
      //   }
      // }, 3000);
    } catch (e: any) {
      this.errorCallback(e.message)
    }
  }
  async sendEthTransaction() {
    const {
      inToken,
      inAmount,
      data,
      to,
      from
    } = this.res;
    let estimatedGas = this.res.estimatedGas === undefined ? 0 : this.res.estimatedGas;
    let swapParams: any = {
      from: from,
      gas: +estimatedGas,
    };
    swapParams.to = to;
    swapParams.data = data;

    let estimatedGasParams: any = {
      from: from,
    };
    estimatedGasParams.to = to;
    estimatedGasParams.data = data;
    if (chains.isNativeToken(this.chain.key, inToken.address)) {
      swapParams.value = inAmount;
      estimatedGasParams.value = inAmount;
    }

    try {
      swapParams.gas = await this.wallet.sdk.eth.estimateGas(estimatedGasParams);
      swapParams.gas = Math.ceil(swapParams.gas * 1.15);
    } catch (e) {
      console.log("estimateGas Error", e);
      this.errorCallback('Unable to estimate gas, which may cause transaction failure')
      return;
    }
    // swapParams.gas = Math.floor(+swapParams.gas > +estimatedGas ? +swapParams.gas : +estimatedGas * 2);
    // swapParams.gas = swapParams.gas ? swapParams.gas : +estimatedGas * 1.5;
    this.wallet.sdk.eth.sendTransaction(swapParams)
      .on('error', (error: any) => {
        this.errorCallback(error)
      })
      .on('transactionHash', (transactionHash: any) => {
        this.transactionHashCallback(transactionHash)
      })
      .on('receipt', (receipt: any) => {
        this.receiptCallback(receipt)
        // this.getSuccess()
      })
  }
  async sendTronTransaction() {
    const {
      inToken,
      outToken,
      inAmount,
      outAmount,
      minOutAmount,
      addresses,
      calldata,
      offsets,
      gasLimitsAndValues,
    } = this.res;
    // const { abi, contract } = res2;
    let data: any = await axios.get(`https://ethapi.openocean.finance/v1/tron/exchange`);
    const _contract = await this.wallet.contract(data.abi, data.contract);
    let swapParams: any = {
      feeLimit: 300000000,
    };
    if (inToken.toLowerCase() === "t9yd14nj9j7xab4dbgeix9h8unkkhxuwwb") {
      swapParams.callValue = inAmount;
    }
    try {
      _contract.methods
        .swap(
          inToken,
          outToken,
          inAmount,
          minOutAmount,
          outAmount, // guaranteedAmount
          "0x0000000000000000000000000000000000000000", // referrer
          addresses,
          calldata,
          offsets,
          gasLimitsAndValues
        )
        .send(swapParams, (result: any, txHash: any) => {
          console.log("state.multicall.methods.swap", result);
          if (result) {
            this.errorCallback(result.message || result)
          } else {
            this.transactionHashCallback(txHash)
          }
        });
    } catch (e: any) {
      this.errorCallback(e || e.message)
    }
  }

  async sendTerraTransaction() {

    try {
      let res2 = {}
      const address = '0x0000000000000000000000000000000000000000'; //state.default_account;
      const gasPrices = await axios.get("https://ethapi.openocean.finance/v1/terra/gas-price", { cache: true });
      debugger
      const msg = await this.getTerraMsgExecuteContract(this.res, res2, address, gasPrices);
      debugger
      const { fee, accountInfo }: any = await this.getTerraFee(address, msg, gasPrices);
      debugger
      await this.wallet.post({
        msgs: [msg],
        gasAdjustment: 1.5,
        waitForConfirmation: true,
        fee,
        account_number: accountInfo.account_number,
        sequence: accountInfo.sequence,
        purgeQueue: true,
      });

      this.wallet.on("onPost", (data: any) => {
        const { result, success } = data || {};
        if (success) {
          const { txhash } = result || {};
          // instance.change({
          //   status: "success",
          //   chain: state.walletType,
          //   address: txhash,
          // });
        } else {
          this.errorCallback('Transaction failed')
          // instance.change({ status: "fail", text: "Transaction failed" });
        }
        // setTimeout(() => {
        //   reload();
        // }, 5000);
      });
    } catch (e: any) {
      // console.warn(e);
      // console.log("Error: " + e.message);
      // instance.change({ status: "fail", text: e.message || e });
      this.errorCallback(e.message || e)
    }
  }

  private async getTerraFee(address: string, msg: any, gasPrices: any) {
    try {
      const terra = new LCDClient({
        chainID: "columbus-5",
        URL: "https://lcd.terra.dev",
        gasPrices,
        gasAdjustment: 1.75,
      });
      const accountInfo: any = await terra.auth.accountInfo(address);
      const fee = await terra.tx.estimateFee(
        [
          {
            sequenceNumber: accountInfo.sequence,
            publicKey: accountInfo.public_key,
          },
        ],
        {
          msgs: [msg],
          feeDenoms: ["uusd"],
        }
      );
      return {
        fee,
        accountInfo,
      };
    } catch (e) {
      return null;
    }
  }
  private getTerraMsgExecuteContract(res: any, res2: any, sender: any, gasPrices: any) {
    try {
      const { inToken, inAmount, execute_swap_operations } = res;
      const { contract } = res2;
      const { address } = inToken;
      let msg = null;
      if (gasPrices[address]) {
        const coins: any = {};
        coins[address] = +inAmount;
        msg = new MsgExecuteContract(
          sender,
          contract,
          {
            execute_swap_operations,
          },
          coins
        );
      } else {
        msg = new MsgExecuteContract(
          sender,
          address,
          {
            send: {
              contract,
              amount: inAmount,
              msg: btoa(JSON.stringify({ execute_swap_operations })),
            },
          },
          []
        );
      }
      return msg;
    } catch (e) {
      return null;
    }
  }

  on(events: string, callback: Function) {
    if (events === 'error') {
      this.errorCallback = callback
    } else if (events === 'transactionHash') {
      this.transactionHashCallback = callback
    } else if (events === 'receipt') {
      this.receiptCallback = callback
    } else if (events === 'success') {
      this.successCallback = callback
    }
    return this
  }
}