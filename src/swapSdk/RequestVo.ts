import { MinLength, IsEnum, Length, IsIn, IsNotEmpty, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'

import { WalletNames } from "../config/Wallets";
import { ChainNames } from "../config/Chains";


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


