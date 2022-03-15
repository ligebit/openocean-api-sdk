export declare class ConnectWallet {
    static setWalletLoacl(reqConnectWalletVo: any): void;
    static link(reqConnectWalletVo: any): Promise<{
        code: number;
        sdk: {
            chain: any;
            wallet: any;
        };
        message?: undefined;
    } | {
        code: number;
        message: any;
        sdk?: undefined;
    }>;
}
