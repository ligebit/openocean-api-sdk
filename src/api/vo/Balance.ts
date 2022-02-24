import 'reflect-metadata'
import { ArrayMinSize, IsDate, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'
import {ReqBase} from './Base'


export class ReqBanlanceVo extends ReqBase{

  @IsNotEmpty({ message: 'Token addresses cannot be empty' })
  @Type(() => String)
  public inTokenAddress: string

  @IsNotEmpty({ message: 'Account cannot be empty' })
  @Type(() => String)
  public account: string

}

