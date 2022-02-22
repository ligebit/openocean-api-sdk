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
  EnumChains
} from "@openocean.finance/wallet";

declare enum EnumWalletType {
  Extension = "Extension",
  WalletConnect = "WalletConnect",
  Web = "Web",
  Mobile = "Mobile"
}

declare abstract class BaseWallet {
  abstract readonly name: string;
  abstract readonly icon: string;
  abstract readonly supportChains: EnumChains[];
  abstract readonly type: EnumWalletType;
  address?: string;
  chain?: EnumChains;
  chainId?: string | number;
  requestConnect?(): Promise<string>;
  requestSolanaConnect?(): Promise<string>;
  requestTerraConnect?(): Promise<string>;
}

const walletList = {
  MetaMask: new MetaMask(),
  // WalletConnect: new WalletConnect(),
  // "BSC Wallet": new BscWallet(),
  // Cyano: new Cyano(),
  // "ONTO Mobile": new OntoMobile(),
  // TronLink: new TronLink(),
  // Sollet: new Sollet(),
  // SolletIo: new SolletIo(),
  // "Trust Wallet": new TrustWallet(),
  // "Math Wallet": new MathWallet(),
  // "Token Pocket": new TokenPocket(),
  // "SafePal Wallet": new SafePalWallet(),
  // "ONTO Wallet": new OntoWallet(),
  // "Coin98 Wallet": new Coin98(),
  // "ImToken Wallet": new ImTokenWallet(),
  // Phantom: new Phantom(),
  // "OKEx Wallet": new OKExWallet(),
  // "Terra Station": new TerraStation(),
  // "Coinbase Wallet": new CoinbaseWallet(),
};

export { walletList, BaseWallet }

