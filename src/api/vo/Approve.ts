
import 'reflect-metadata'
import { ArrayMinSize, IsDate, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'
import {ReqBase} from './Base'


export class ReqAllowanceVo extends ReqBase{

  @IsNotEmpty({ message: 'Token addresses cannot be empty' })
  @Type(() => String)
  public inTokenAddress: string

  @IsNotEmpty({ message: 'Account cannot be empty' })
  @Type(() => String)
  public account: string

  @IsNotEmpty({ message: 'Contract addresses cannot be empty' })
  @Type(() => String)
  public contractAddress: string

}



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