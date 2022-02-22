import { MetaMask, EnumChains } from "@openocean.finance/wallet";
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
declare const walletList: {
    MetaMask: MetaMask;
};
export { walletList, BaseWallet };
