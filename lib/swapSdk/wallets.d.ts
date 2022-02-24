declare enum EnumWalletType {
    Extension = "Extension",
    WalletConnect = "WalletConnect",
    Web = "Web",
    Mobile = "Mobile"
}
declare abstract class BaseWallet {
    abstract readonly name: string;
    abstract readonly icon: string;
    abstract readonly supportChains: any;
    abstract readonly type: EnumWalletType;
    address?: string;
    chain?: any;
    chainId?: string | number;
    requestConnect?(): Promise<string>;
    requestSolanaConnect?(): Promise<string>;
    requestTerraConnect?(): Promise<string>;
}
export { BaseWallet };
