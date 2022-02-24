import 'reflect-metadata'
import { ArrayMinSize, IsDate, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'


export class ReqBase{

  @IsNotEmpty({ message: 'ChainId addresses cannot be empty' })
  @Type(() => String)
  public chainId: string

}
