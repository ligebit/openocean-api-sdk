
import 'reflect-metadata'
import { MinLength, Length, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'
import { ReqBase } from './RequestVo'

export class Approve {
  params: any
  errorCallback: Function = () => { }
  transactionHashCallback: Function = () => { }
  constructor(params: any) {
    this.params = params
  }
  send() {

    return this.params.chainId
  }
  on(events: string, callback: Function) {
    if (events === 'error') {
      this.errorCallback = callback
    } else if (events === 'transactionHash') {
      this.transactionHashCallback = callback
    }
  }
}