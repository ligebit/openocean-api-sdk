export declare class ConnectWallet {
    static setWallet(wallet: any, reqConnectWalletVo: any, chainId: string): any;
    static link(reqConnectWalletVo: any): Promise<{
        code: number;
        wallet: any;
        message?: undefined;
    } | {
        code: number;
        message: any;
        wallet?: undefined;
    }>;
}
