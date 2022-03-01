import 'reflect-metadata'
import { MinLength, IsEnum, Length, IsIn, IsNotEmpty, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'

const ChainIds: String[] = ['1', '3', '4', '56', '100', '137', '250', '42161', '43114']
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

enum ExChanges { 'openoceanv1', 'openoceanv2', '1inch', 'matcha', 'paraswap' }
export class ReqQuoteVo extends ReqBase {
  @IsNotEmpty({ message: 'ExChange cannot be empty' })
  @IsEnum(ExChanges, { message: 'ExChange in(openoceanv1/openoceanv2/1inch/matcha/paraswap)' })
  @Type(() => String)
  public exChange: string | 'openoceanv2'

  @IsNotEmpty({ message: 'In Token address cannot be empty' })
  @Type(() => String)
  public inTokenAddress: string

  @IsNotEmpty({ message: 'Out Token address cannot be empty' })
  @Type(() => String)
  public outTokenAddress: string

  @IsNotEmpty({ message: 'Amount cannot be empty' })
  @Type(() => Number)
  public amount: Number

  @IsNotEmpty({ message: 'GasPrice cannot be empty' })
  @Type(() => Number)
  public gasPrice: Number

  @IsNotEmpty({ message: 'Slippage cannot be empty' })
  @Type(() => Number)
  public slippage: Number

  @Type(() => Number)
  public in_token_decimals: Number

  @Type(() => Number)
  public out_token_decimals: Number

  @Type(() => String)
  public withRoute: String

}
export class ReqSwapVo extends ReqBase {
  @IsNotEmpty({ message: 'ExChange cannot be empty' })
  @IsEnum(ExChanges, { message: 'ExChange in(openoceanv1/openoceanv2/1inch/matcha/paraswap)' })
  @Type(() => String)
  public exChange: string | 'openoceanv2'

  @IsNotEmpty({ message: 'In Token address cannot be empty' })
  @Type(() => String)
  public inTokenAddress: string

  @IsNotEmpty({ message: 'Out Token address cannot be empty' })
  @Type(() => String)
  public outTokenAddress: string

  @IsNotEmpty({ message: 'Amount cannot be empty' })
  @Type(() => Number)
  public amount: Number

  @IsNotEmpty({ message: 'GasPrice cannot be empty' })
  @Type(() => Number)
  public gasPrice: Number

  @IsNotEmpty({ message: 'Slippage cannot be empty' })
  @Type(() => Number)
  public slippage: Number

  @IsNotEmpty({ message: 'String cannot be empty' })
  @Type(() => String)
  public account: String

  @Type(() => String)
  public referrer: String

  @Type(() => Number)
  public in_token_decimals: Number

  @Type(() => Number)
  public out_token_decimals: Number

  @Type(() => Boolean)
  public withoutCheckBalance: Boolean

}


enum TransactionType { 'transfer', 'swap' }
export class ReqTransactionReceiptVo extends ReqBase {
  @IsNotEmpty({ message: 'ExChange cannot be empty' })
  @IsEnum(ExChanges, { message: 'ExChange id in(openoceanv1/openoceanv2/1inch/matcha/paraswap)' })
  @Type(() => String)
  public exChange: string | 'openoceanv2'

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



export class ReqtransferVo extends ReqBase {
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





