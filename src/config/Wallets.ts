

import {
  MetaMask,
  BscWallet,
  Cyano,
  TronLink,
  Sollet,
  SolletIo,
  WalletConnect,
  OntoMobile,
  TrustWallet,
  MathWallet,
  TokenPocket,
  SafePalWallet,
  OntoWallet,
  Coin98,
  ImTokenWallet,
  Phantom,
  OKExWallet,
  TerraStation,
  CoinbaseWallet,
} from "@openocean.finance/wallet";


export enum WalletNames {
  'MetaMask',
  'WalletConnect',
  'BscWallet',
  'Cyano',
  'OntoMobile',
  'TronLink',
  'Sollet',
  'SolletIo',
  'TrustWallet',
  'MathWallet',
  'TokenPocket',
  'SafePalWallet',
  'OntoWallet',
  'Coin98Wallet',
  'ImTokenWallet',
  'Phantom',
  'OkExWallet',
  'TerraStation',
  'CoinbaseWallet'
}

const WalletObj: any = {
  MetaMask: new MetaMask(),
  WalletConnect: new WalletConnect(),
  BscWallet: new BscWallet(),
  Cyano: new Cyano(),
  OntoMobile: new OntoMobile(),
  TronLink: new TronLink(),
  Sollet: new Sollet(),
  SolletIo: new SolletIo(),
  TrustWallet: new TrustWallet(),
  MathWallet: new MathWallet(),
  TokenPocket: new TokenPocket(),
  SafePalWallet: new SafePalWallet(),
  OntoWallet: new OntoWallet(),
  Coin98Wallet: new Coin98(),
  ImTokenWallet: new ImTokenWallet(),
  Phantom: new Phantom(),
  OkExWallet: new OKExWallet(),
  TerraStation: new TerraStation(),
  CoinbaseWallet: new CoinbaseWallet(),
};
export class Wallets {
  walletObj: any = {}
  walletList: any[] = []
  constructor() {
    WalletObj.MetaMask.supportChains.push('rinkeby')
    WalletObj.MetaMask.supportChains.push('ropsten')
    this.walletObj = WalletObj
    this.walletList = Object.keys(WalletObj).map((key: string) => {
      WalletObj[key].key = key
      return WalletObj[key]
    })
  }
}

export const wallets = new Wallets()


