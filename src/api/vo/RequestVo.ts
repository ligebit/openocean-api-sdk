import 'reflect-metadata'
import { MinLength, Length, IsIn, IsNotEmpty, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'

const ChainIds: String[] = ['1', '56', '100', '137', '250', '42161', '43114']
export class ReqBase {

  @IsNotEmpty({ message: 'ChainId addresses cannot be empty' })
  @IsIn(ChainIds, { message: 'Chain id in(1/56/100/137/250/42161/43114)' })
  @Type(() => String)
  public chainId: string

}


export class ReqBanlanceVo extends ReqBase {
  @IsNotEmpty({ message: 'Account cannot be empty' })
  @Length(30, 60, { message: 'Account length error' })
  @Type(() => String)
  public account: string

  @IsNotEmpty({ message: 'Token addresses cannot be empty' })
  @MinLength(30, { message: 'Token addresses length error' })
  @Type(() => String)
  public inTokenAddress: string

}

export class ReqAllowanceVo extends ReqBase {

  @IsNotEmpty({ message: 'Account cannot be empty' })
  @Length(30, 60, { message: 'Account length error' })
  @Type(() => String)
  public account: string

  @IsNotEmpty({ message: 'Token addresses cannot be empty' })
  @MinLength(30, { message: 'Token addresses length error' })
  @Type(() => String)
  public inTokenAddress: string

  @IsNotEmpty({ message: 'Contract addresses cannot be empty' })
  @MinLength(30, { message: 'Contract addresses length error' })
  @Type(() => String)
  public contractAddress: string

}

export class ReqTokenPriceVo {
  @IsNotEmpty({ message: 'ChainId cannot be empty' })
  @Type(() => String)
  public ids: string

  @IsNotEmpty({ message: 'Token name cannot be empty' })
  @Length(2, 4, { message: 'Token name length error' })
  @Type(() => String)
  public vs_currencies: string

}


export class ReqTokenInfoVo {
  @IsNotEmpty({ message: 'ChainId cannot be empty' })
  @Type(() => String)
  public id: string

  @IsNotEmpty({ message: 'Contract address cannot be empty' })
  @Type(() => String)
  public contract_address: string
  
}


