import { MinLength, IsEnum, Length, IsIn, IsNotEmpty, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'
import { WalletNames } from "../config/Wallets";
import { chains } from "../config/Chains";
import { ChainName } from "../api/vo/RequestVo";


export class ReqConnectWalletVo extends ChainName  {
  @IsNotEmpty({ message: 'Wallet name cannot be empty' })
  @IsEnum(WalletNames, { message: 'Wallet name error' })
  @Type(() => String)
  public walletName: string
}


export class ReqApproveVo extends ChainName {

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

