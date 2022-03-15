
import { ReqConnectWalletVo, ReqApproveVo } from "./RequestVo";
import { validateReq } from "../utils/ajx";
import { utils } from "../utils";
import { ConnectWallet } from "./ConnectWallet";
import { Approve } from "./Approve";
import { ERC20_abi } from "../config";
import { Swap, ReqSwapVo } from "./Swap";

class SwapSdk {
  i: number = 0;
  chain: any;
  wallet: any;
  constructor() {
    let data = localStorage.getItem('opencean_link_obj')
    if (data) {
      this.connectWallet(JSON.parse(data))
    }
  }
  public swap(reqSwapVo: ReqSwapVo) {
    if (!this.wallet) {
      return {
        code: 400,
        message: 'No linked wallet'
      }
    }
    if (this.wallet && this.chain.key != reqSwapVo.chain) {
      return {
        code: 400,
        message: 'Network error'
      }
    }
    let swap = new Swap(reqSwapVo)
    swap.send(this.wallet,this.chain)
    return swap
  }
  public async approve(reqApproveVo: ReqApproveVo) {
    if (!this.wallet) {
      return {
        code: 400,
        message: 'No linked wallet'
      }
    }
    if (this.wallet && this.wallet.chain != reqApproveVo.chain) {
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
    const contract = new this.wallet.sdk.eth.Contract(reqApproveVo.tokenAbi, reqApproveVo.tokenAddress);
    if (!contract || !contract.methods || !contract.methods.approve) {
      return {
        code: 400,
        message: 'Contract error'
      }
    }
    let approve = new Approve(contract)
    approve.send(reqApproveVo, this.wallet.address)
    return approve
  }
  public async connectWallet(reqConnectWalletVo: ReqConnectWalletVo) {
    if (this.wallet && this.wallet.key == reqConnectWalletVo.walletName && this.wallet.chainName == reqConnectWalletVo.chain) {
      return {
        code: 200,
        sdk: {
          wallet: this.wallet,
          chain: this.chain
        }
      }
    }
    const errors = await validateReq(reqConnectWalletVo, ReqConnectWalletVo)
    if (errors) {
      return {
        code: 400,
        message: errors
      }
    } else {
      let data: any = await ConnectWallet.link(reqConnectWalletVo)
      if (data.code == 200) {
        this.wallet = data.sdk.wallet
        this.chain = data.sdk.chain
      }
      return data
    }
  }
  public async getWallet() {
    if (this.wallet) return this.wallet
    await utils.sleep(1000)
    if (this.wallet) return this.wallet
    await utils.sleep(1000)
    if (this.wallet) return this.wallet
    return
  }
  public async getChain() {
    if (this.chain) return this.chain
    await utils.sleep(1000)
    if (this.chain) return this.chain
    await utils.sleep(1000)
    if (this.chain) return this.chain
    return
  }
}

export { SwapSdk } 
