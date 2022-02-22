
import SwapSdk, { Api, units, walletList } from '../src/index';

async function init() {
  let swapSdk = new SwapSdk()

  swapSdk.connectWallet(1, walletList[0])
  console.log(swapSdk)
}

init()