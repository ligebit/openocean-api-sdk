import { ReqApproveVo } from "./RequestVo";
import { api } from "../api";
import { ReqSwapVo } from "../api/vo/RequestVo";


export { ReqSwapVo }
export class Swap {
  private errorCallback: Function = () => { }
  private transactionHashCallback: Function = () => { }
  private receiptCallback: Function = () => { }
  private successCallback: Function = () => { }
  contract: any
  option: ReqSwapVo

  constructor(option: ReqSwapVo) {
    this.option = option
  }
  async send() {
    let data =await api.swap(this.option)
    debugger
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