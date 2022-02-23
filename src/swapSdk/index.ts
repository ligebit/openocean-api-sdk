import { BaseWallet } from './wallets'
class SwapSdk {

  public connectWallet(chainId: number, walletObj: BaseWallet) {
    console.log(chainId)
    console.log(walletObj)

  }

}

export default SwapSdk
