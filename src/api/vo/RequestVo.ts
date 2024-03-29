import 'reflect-metadata'
import { MinLength, IsEnum, Length, IsIn, IsNotEmpty, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'
import { chains } from "../../config/Chains";


export class ReqBase {

  @IsNotEmpty({ message: 'ChainId addresses cannot be empty' })
  @IsIn(chains.chainIds, { message: 'Chain id in(31/56/100/137/250/42161/43114)' })
  @Type(() => String)
  public chainId: string

}

export class ChainName {

  @IsNotEmpty({ message: 'Chain addresses cannot be empty' })
  @IsIn(chains.chainNames, { message: `Chain in()` })
  @Type(() => String)
  public chain: string

}


export class ReqBanlanceVo extends ChainName {
  @IsNotEmpty({ message: 'Account cannot be empty' })
  @Length(30, 60, { message: 'Account length error' })
  @Type(() => String)
  public account: string

  @IsNotEmpty({ message: 'Token addresses cannot be empty' })
  @MinLength(30, { message: 'Token addresses length error' })
  @Type(() => String)
  public inTokenAddress: string

}

export class ReqAllowanceVo extends ChainName {

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

export class ReqQuoteVo extends ChainName {
  
  @IsNotEmpty({ message: 'In Token address cannot be empty' })
  @Type(() => String)
  public inTokenAddress: string

  @IsNotEmpty({ message: 'Out Token address cannot be empty' })
  @Type(() => String)
  public outTokenAddress: string

  @IsNotEmpty({ message: 'Amount cannot be empty' })
  @Type(() => Number)
  public amount: Number

  @IsNotEmpty({ message: 'Slippage cannot be empty' })
  @Type(() => Number)
  public slippage: Number

  @Type(() => String)
  public gasPrice: String

}
export class ReqSwapVo extends ChainName {

  @IsNotEmpty({ message: 'In Token address cannot be empty' })
  @Type(() => String)
  public inTokenAddress: string

  @IsNotEmpty({ message: 'Out Token address cannot be empty' })
  @Type(() => String)
  public outTokenAddress: string

  @IsNotEmpty({ message: 'Amount cannot be empty' })
  @Type(() => Number)
  public amount: Number

  @IsNotEmpty({ message: 'Slippage cannot be empty' })
  @Type(() => Number)
  public slippage: Number

  @IsNotEmpty({ message: 'String cannot be empty' })
  @Type(() => String)
  public account: String

  @Type(() => String)
  public gasPrice: String

}


enum TransactionType { 'transfer', 'swap' }
export class ReqTransactionReceiptVo extends ChainName {

  @IsNotEmpty({ message: 'Hash cannot be empty' })
  @Type(() => String)
  public hash: string

}
export class ReqTransactionVo extends ReqTransactionReceiptVo {
  @IsNotEmpty({ message: 'Type cannot be empty' })
  @IsEnum(TransactionType, { message: `Type in (transfer/swap)` })
  @Type(() => String)
  public type: string

}

export class ReqtransferVo extends ChainName {
  @IsNotEmpty({ message: 'In Token address cannot be empty' })
  @Type(() => String)
  public inTokenAddress: string

  @IsNotEmpty({ message: 'Decimals cannot be empty' })
  @Type(() => Number)
  public decimals: Number

  @IsNotEmpty({ message: 'Amount cannot be empty' })
  @Type(() => Number)
  public amount: Number

  @IsNotEmpty({ message: 'GasPrice cannot be empty' })
  @Type(() => Number)
  public gasPrice: Number

  @IsNotEmpty({ message: 'TargetAddress cannot be empty' })
  @Type(() => Number)
  public targetAddress: Number

}





