
import { ReqConnectWalletVo } from "./RequestVo";
import { validateReq } from "../utils/ajx";
import { utils } from "../utils";

import { wallets } from "../config/Wallets";
import { chains } from "../config/Chains";


class SwapSdk {

  constructor() { }

  public async connectWallet(reqConnectWalletVo: ReqConnectWalletVo) {
    const errors = await validateReq(reqConnectWalletVo, ReqConnectWalletVo)
    if (errors) {
      return {
        code: 400,
        message: errors
      }
    } else {
      let target = wallets.walletObj[reqConnectWalletVo.walletName]
      const chain: any = chains.chainObj[reqConnectWalletVo.chainName]
      const chainId: string = chain.chainId
      try {
        chainId ? await target.requestConnect(chainId) : await target.requestConnect();
        return {
          code: 200,
          target: { ...target }
        }
      } catch (e: any) {
        const { message } = e;
        const { currentProvider, utils: utilsSkd } = target.sdk || {};
        if (message === "40006" && currentProvider) {
          const params = chains.ethereumChainParams[chain.key];
          if (params) {
            await currentProvider.request({
              method: "wallet_addEthereumChain",
              params
            })
            await utils.sleep(1500)
            if (utilsSkd.toHex(chainId) == target.sdk.currentProvider.chainId) {
              target.chainId = chainId
              return {
                code: 200,
                target: { ...target }
              }
            } else {
              return {
                code: 401,
                message: 'User rejected the request.'
              }
            }
          } else if (chainId == '1') {
            try {
              await currentProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{
                  chainId: utilsSkd.toHex(chainId)
                }],
              });
              target.chainId = chainId
              return {
                code: 200,
                target: { ...target }
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

}

export { SwapSdk } 
