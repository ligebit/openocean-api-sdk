import { api } from "../api";
import { ReqSwapVo } from "../api/vo/RequestVo";
import { chains } from "../config/Chains";
import { Transaction } from "@solana/web3.js";
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
      case 'SOL':
        this.sendTronTransaction()
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
    debugger
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