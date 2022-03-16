import { wallets } from "../config/Wallets";
import { utils } from "../utils";
import { Connection, PublicKey } from "@solana/web3.js";
import { chains } from "../config/Chains";
import { NotoMobile } from "./NotoMobile";

const axios = require('axios');

export class ConnectWallet {
  static setWalletLoacl(reqConnectWalletVo: any) {
    localStorage.setItem('opencean_link_obj', JSON.stringify(reqConnectWalletVo))
  }
  static async link(reqConnectWalletVo: any) {
    let wallet = wallets.walletObj[reqConnectWalletVo.walletName]
    const chain: any = chains.chainObj[reqConnectWalletVo.chain]
    if (!chain) {
      return {
        code: 401,
        message: 'Chain error.'
      }
    }
    const chainId: string = chain.chainId
    const selectedChain: string = chain.key

    try {

      if (wallet.type === 'WalletConnect') {
        wallet.infuraId = '2c7c4d86c2c746c89de722551b606119';
        await wallet.requestConnect(chainId)
        // this.connect(wallet);
      }
      else if (wallet.name === 'ONTO Mobile') {
        const qrData = await axios.get('https://ethapi.openocean.finance/v1/ont/login');
        wallet.qrData = qrData.data
        const instance = new NotoMobile(qrData.data);
        instance.$on('close', (action: any, account: any, result: any) => {

        })
        // const instance = showOntoScan(qrData);
        // instance.$on("close", (action: any, account: any, result: any) => {
        //   if (action === 'login' && result === 'success') {
        //     wallet.address = account;
        //     // this.connect(wallet);
        //     // document.body.removeChild(instance.$el);
        //   } else {
        //     // document.body.removeChild(instance.$el);
        //   }
        // })
      }
      else if (selectedChain === 'terra') {
        if (!wallet.sdk) {
          const res = await wallet.requestTerraConnect()
          if (res) {
            // this.connect(wallet);
          } else {
            // const message = {
            //   'XDEFI Wallet': 'wallet_message_40018',
            //   'Terra Station': 'wallet_message_40015'
            // }[wallet.name];
            // showToast(this.$t(message));
          }
        }
      } else if (selectedChain === "solana") {
        const res = await wallet.requestSolanaConnect();
        wallet.customPublicKey = new PublicKey(res);
        wallet.connection = new Connection(
          "https://api.mainnet-beta.solana.com"
        );

        if (res) {
          // this.connect(wallet);
        } else {
          // const message = {
          //   'Sollet': 'wallet_message_40010',
          //   'Coin98 Wallet': 'wallet_message_40011',
          //   'Phantom': 'wallet_message_40013',
          //   'Clover Wallet': 'wallet_message_40017',
          //   'Slope Wallet': 'wallet_message_40019',
          //   'Solflare Wallet': 'wallet_message_40020',
          // };
          // return {
          //   code: 401,
          //   message: message
          // }
        }
      } else {
        const res = chainId ? await wallet.requestConnect(chainId) : await wallet.requestConnect();
        console.log('wallet.requestConnect', res, wallet);
        if (res) {
          // this.connect(wallet);
        }
      }

      this.setWalletLoacl(reqConnectWalletVo)
      return {
        code: 200,
        sdk: { chain, wallet }
      }
    } catch (e: any) {
      const { message } = e;
      const { currentProvider, utils: utilsSkd } = wallet.sdk || {};

      if (message === "40006" && currentProvider) {
        const params = chains.ethereumChainParams[reqConnectWalletVo.chain];
        if (params) {
          await currentProvider.request({
            method: "wallet_addEthereumChain",
            params
          })
          await utils.sleep(1500)
          if (utilsSkd.toHex(chainId) == wallet.sdk.currentProvider.chainId) {
            this.setWalletLoacl(reqConnectWalletVo)
            return {
              code: 200,
              sdk: { chain, wallet }
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
            this.setWalletLoacl(reqConnectWalletVo)

            return {
              code: 200,
              sdk: { chain, wallet }
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








    // try {
    //   chainId ? await wallet.requestConnect(chainId) : await wallet.requestConnect();
    //   this.setWalletLoacl(reqConnectWalletVo)
    //   return {
    //     code: 200,
    //     sdk: { chain, wallet }
    //   }
    // } catch (e: any) {
    //   const { message } = e;
    //   const { currentProvider, utils: utilsSkd } = wallet.sdk || {};
    //   if (message === "40006" && currentProvider) {
    //     const params = chains.ethereumChainParams[reqConnectWalletVo.chain];
    //     if (params) {
    //       await currentProvider.request({
    //         method: "wallet_addEthereumChain",
    //         params
    //       })
    //       await utils.sleep(1500)
    //       if (utilsSkd.toHex(chainId) == wallet.sdk.currentProvider.chainId) {
    //         this.setWalletLoacl(reqConnectWalletVo)
    //         return {
    //           code: 200,
    //           sdk: { chain, wallet }
    //         }
    //       } else {
    //         return {
    //           code: 401,
    //           message: 'User rejected the request.'
    //         }
    //       }
    //     } else if (chainId == '1' || chainId == '3' || chainId == '4') {
    //       try {
    //         await currentProvider.request({
    //           method: 'wallet_switchEthereumChain',
    //           params: [{
    //             chainId: utilsSkd.toHex(chainId)
    //           }],
    //         });
    //         this.setWalletLoacl(reqConnectWalletVo)

    //         return {
    //           code: 200,
    //           sdk: { chain, wallet }
    //         }
    //       } catch (error: any) {
    //         return {
    //           code: 401,
    //           message: error.message
    //         }
    //       }
    //     } else {
    //       return {
    //         code: 500,
    //         message: 'Network error'
    //       }
    //     }
    //   } else {
    //     return {
    //       code: 500,
    //       message: /^\d+$/.test(message) ? "wallet_message_" + message : message
    //     }
    //   }
    // }
  }
}