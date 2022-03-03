import { wallets } from "../config/Wallets";
import { utils } from "../utils";
import { chains } from "../config/Chains";
export class ConnectWallet {
  static setWallet(wallet: any, reqConnectWalletVo: any, chainId: string) {
    wallet.chainName = reqConnectWalletVo.chainName
    wallet.chainId = chainId
    localStorage.setItem('opencean_link_obj', JSON.stringify(reqConnectWalletVo))
    return wallet
  }
  static async link(reqConnectWalletVo: any) {
    let wallet = wallets.walletObj[reqConnectWalletVo.walletName]
    const chain: any = chains.chainObj[reqConnectWalletVo.chainName]
    const chainId: string = chain.chainId
    try {
      chainId ? await wallet.requestConnect(chainId) : await wallet.requestConnect();
      return {
        code: 200,
        wallet: this.setWallet({ ...wallet }, reqConnectWalletVo, chainId)
      }
    } catch (e: any) {
      const { message } = e;
      const { currentProvider, utils: utilsSkd } = wallet.sdk || {};
      if (message === "40006" && currentProvider) {
        const params = chains.ethereumChainParams[reqConnectWalletVo.chainName];
        if (params) {
          await currentProvider.request({
            method: "wallet_addEthereumChain",
            params
          })
          await utils.sleep(1500)
          if (utilsSkd.toHex(chainId) == wallet.sdk.currentProvider.chainId) {
            return {
              code: 200,
              wallet: this.setWallet({ ...wallet }, reqConnectWalletVo, chainId)
            }
          } else {
            return {
              code: 401,
              message: 'User rejected the request.'
            }
          }
        } else if (chainId == '1' || chainId == '3' || chainId == '4') {
          try {
            await currentProvider.request({
              method: 'wallet_switchEthereumChain',
              params: [{
                chainId: utilsSkd.toHex(chainId)
              }],
            });

            return {
              code: 200,
              wallet: this.setWallet({ ...wallet }, reqConnectWalletVo, chainId)
            }
          } catch (error: any) {
            return {
              code: 401,
              message: error.message
            }
          }
        } else {
          return {
            code: 500,
            message: 'Network error'
          }
        }
      } else {
        return {
          code: 500,
          message: /^\d+$/.test(message) ? "wallet_message_" + message : message
        }
      }
    }
  }
}