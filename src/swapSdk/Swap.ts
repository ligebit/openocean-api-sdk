import { api } from "../api";
import { ReqSwapVo } from "../api/vo/RequestVo";
import { chains } from "../config/Chains";

export { ReqSwapVo }
export class Swap {
  private errorCallback: Function = () => { }
  private transactionHashCallback: Function = () => { }
  private receiptCallback: Function = () => { }
  private successCallback: Function = () => { }
  contract: any
  option: ReqSwapVo
  res: any
  target: any

  constructor(option: ReqSwapVo) {
    this.option = option
  }
  async send(target: any) {
    this.target = target
    let data = await api.swap(this.option)
    if(data.code!=200){
      this.errorCallback(data.error)
      return this
    }
    this.res = data.data
    this.sendEthTransaction()
    return this
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
    if (chains.isNativeToken(this.target.chainName, inToken.address)) {
      swapParams.value = inAmount;
      estimatedGasParams.value = inAmount;
    }

    try {
      swapParams.gas = await this.target.sdk.eth.estimateGas(estimatedGasParams);
      swapParams.gas = Math.ceil(swapParams.gas * 1.15);
    } catch (e) {
      console.log("estimateGas Error", e);
      this.errorCallback('Unable to estimate gas, which may cause transaction failure')
      return;
    }
    // swapParams.gas = Math.floor(+swapParams.gas > +estimatedGas ? +swapParams.gas : +estimatedGas * 2);
    // swapParams.gas = swapParams.gas ? swapParams.gas : +estimatedGas * 1.5;
    this.target.sdk.eth.sendTransaction(swapParams)
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