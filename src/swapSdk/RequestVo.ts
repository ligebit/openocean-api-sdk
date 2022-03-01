import { MinLength, IsEnum, Length, IsIn, IsNotEmpty, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'

import { WalletNames } from "../config/Wallets";
import { ChainNames } from "../config/Chains";

import { ReqBase } from "../api/vo/RequestVo";


export class ReqConnectWalletVo {
  @IsNotEmpty({ message: 'Chain name cannot be empty' })
  @IsEnum(ChainNames, { message: 'Chain name error' })
  @Type(() => String)
  public chainName: string

  @IsNotEmpty({ message: 'Wallet name cannot be empty' })
  @IsEnum(WalletNames, { message: 'Wallet name error' })
  @Type(() => String)
  public walletName: string
}


export class ReqApproveVo extends ReqBase {

  @IsNotEmpty({ message: 'Token addresses cannot be empty' })
  @MinLength(30, { message: 'Token addresses length error' })
  @Type(() => String)
  public tokenAddress: string

  @IsNotEmpty({ message: 'Contract addresses cannot be empty' })
  @MinLength(30, { message: 'Contract addresses length error' })
  @Type(() => String)
  public contractAddress: string

  // @IsNotEmpty({ message: 'Amount cannot be empty' })
  // @Type(() => Number)
  public amount: string

  // @IsNotEmpty({ message: 'GasPrice cannot be empty' })
  // @Type(() => Number)
  public gasPrice: Number

  // @IsNotEmpty({ message: 'Contract aib cannot be empty' })
  public tokenAbi: any

}

