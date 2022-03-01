
import { ReqConnectWalletVo, ReqApproveVo } from "./RequestVo";
import { validateReq } from "../utils/ajx";
import { utils } from "../utils";

import { wallets } from "../config/Wallets";
import { chains } from "../config/Chains";
import { Approve } from "./Approve";
import { ERC20_abi } from "../config";
import { Swap, ReqSwapVo } from "./Swap";


class SwapSdk {

  target: any;
  constructor() { }
  swap(option: ReqSwapVo) {
    let swap = new Swap(option)
    swap.send()
    return swap
  }
  public async approve(reqApproveVo: ReqApproveVo) {
    if (!this.target) {
      return {
        code: 400,
        message: 'No linked wallet'
      }
    }
    if (this.target && this.target.chainId != reqApproveVo.chainId) {
      return {
        code: 400,
        message: 'Network error'
      }
    }

    const errors = await validateReq(reqApproveVo, ReqApproveVo)
    if (errors) {
      return {
        code: 400,
        message: errors
      }
    }

    if (!reqApproveVo.tokenAbi) reqApproveVo.tokenAbi = ERC20_abi
    const contract = new this.target.sdk.eth.Contract(reqApproveVo.tokenAbi, reqApproveVo.tokenAddress);
    if (!contract || !contract.methods || !contract.methods.approve) {
      return {
        code: 400,
        message: 'Contract error'
      }
    }
    let approve = new Approve(contract)
    approve.send(reqApproveVo, this.target.address)
    return approve
  }

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
        this.target = { ...target }
        return {
          code: 200,
          target: this.target
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
              this.target = { ...target }
              return {
                code: 200,
                target: this.target
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
              target.chainId = chainId
              this.target = { ...target }
              return {
                code: 200,
                target: this.target
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
