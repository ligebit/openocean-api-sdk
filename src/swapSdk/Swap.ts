import { api } from "../api";
import { ReqSwapVo } from "../api/vo/RequestVo";
import { chains } from "../config/Chains";
import { Transaction } from "@solana/web3.js";
import { LCDClient, MsgExecuteContract } from "@terra-money/terra.js";
import { utils } from "ontology-ts-sdk";
import { client, ParameterType } from "@ont-dev/ontology-dapi";
import { NotoMobile } from "./NotoMobile";
const axios = require('axios');
const bs58 = require("bs58");
client.registerClient({});

export { ReqSwapVo }
export class Swap {
  private getDataCallback: Function = () => { }
  private errorCallback: Function = () => { }
  private transactionHashCallback: Function = () => { }
  private receiptCallback: Function = () => { }
  private successCallback: Function = () => { }
  contract: any
  res: any
  wallet: any
  chain: any

  constructor(res: any, wallet: any, chain: any) {
    this.res = res
    this.wallet = wallet
    this.chain = chain
    setTimeout(() => {
      this.send()
    }, 200);
  }

  send() {
    switch (this.chain.compiler) {
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
      case 'ONT':
        this.sendONTTransaction()
        break
    }
    return this
  }

  async sendONTTransaction() {
    const { approve, swap, transaction, inAmount, inToken } = this.res;
    if (this.wallet.key === "OntoMobile") {
      const instance = new NotoMobile(approve ? approve : swap);
      let account = await new Promise((r, q) => {
        instance.$on('close', (result: any, action: any, account: any) => {
          if (action === 'login' && result === 'success') {
            r(account)
          } else {
            q(action)
          }
        })
      })
      this.transactionHashCallback(account)
    } else {
      if (approve) {
        this.approveOnt(transaction, inAmount, inToken);
      } else {
        this.sendOntTransactionSdk(transaction);
      }
    }
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
    let { data }: any = await axios.get(`https://ethapi.openocean.finance/v1/tron/exchange`);
    const _contract = await this.wallet.sdk.contract(data.abi, data.contract);
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
      let { data }: any = await axios.get(`https://ethapi.openocean.finance/v1/terra/exchange`);
      const address = this.wallet.address; //state.default_account;
      const gasPrices = await axios.get("https://ethapi.openocean.finance/v1/terra/gas-price", { cache: true });
      const msg = await this.getTerraMsgExecuteContract(this.res, data, address, gasPrices.data);
      const { fee, accountInfo }: any = await this.getTerraFee(address, msg, gasPrices.data);
      await this.wallet.sdk.post({
        msgs: [msg],
        gasAdjustment: 1.5,
        waitForConfirmation: true,
        fee,
        account_number: accountInfo.account_number,
        sequence: accountInfo.sequence,
        purgeQueue: true,
      });
      this.wallet.sdk.on("onPost", (data: any) => {
        const { result, success } = data || {};
        if (success) {
          const { txhash } = result || {};
          this.transactionHashCallback(txhash)
        } else {
          this.errorCallback('Transaction failed')
        }
      });
    } catch (e: any) {
      this.errorCallback(e.message || e)
    }
  }

  private async approveOnt(transaction: any, _amount: any, inToken: string) {

    try {
      const { scriptHash, operation, gasLimit, args } = transaction;
      const params: any = {
        contract: inToken,
        operation: "approve",
        args: [
          {
            type: "Address",
            value: this.wallet.address,
          },
          {
            type: "ByteArray",
            value: utils.reverseHex(scriptHash),
          },
          {
            type: "ByteArray",
            value: utils.bigIntToBytes(_amount + ""),
          },
        ],
        gasPrice: 2500,
        gasLimit: 40000,
      };
      const result = await client.api.smartContract.invoke(params);
      console.log("approveOnt params, result", params, result);
      this.sendOntTransactionSdk(transaction);
    } catch (e: any) {
      // tslint:disable-next-line:no-console
      console.log("onScCall error:", e);
      this.errorCallback((e && e.message) || e)
    }
  }
  private async sendOntTransactionSdk(transaction: any) {

    try {
      const { scriptHash, operation, gasLimit, args } = transaction;
      const params = {
        scriptHash,
        operation,
        args: args.map((item: any) => {
          const { type } = item;
          if (["Long", "Integer"].indexOf(type) >= 0) {
            item.value = Number(item.value);
          }
          return item;
        }),
        gasPrice: 2500,
        gasLimit: 60000,
        requireIdentity: false,
      };
      console.log("sendOntTransaction params", params);
      const result = await client.api.smartContract.invoke(params);
      // tslint:disable-next-line:no-console
      console.log("onScCall finished, result:" + JSON.stringify(result));
      if (result && result.transaction) {
        this.successCallback({
          status: "success",
          title: "progress_transactions_submitted",
          // chain: this.walletType,
          address: result.transaction,
        })
      } else {
        this.successCallback({
          status: "success",
          title: "progress_transactions_submitted",
          text: "progress_transactions_swap_tips2",
        })
      }
    } catch (e: any) {
      // tslint:disable-next-line:no-console
      console.log("onScCall error:", e);
      this.errorCallback((e && e.message) || e)
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
      const { inToken, inAmount, data } = res;
      let dataObj: any = data.msgs.map((item: any) => {
        return JSON.parse(item)
      })
      let execute_swap_operations = dataObj[0].execute_msg.execute_swap_operations

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
    } else if (events === 'getDataSuccess') {
      this.getDataCallback = callback
    }

    return this
  }
}