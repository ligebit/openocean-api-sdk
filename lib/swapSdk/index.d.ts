import { ReqConnectWalletVo } from "./RequestVo";
declare class SwapSdk {
    constructor();
    connectWallet(reqConnectWalletVo: ReqConnectWalletVo): Promise<{
        code: number;
        target: any;
        message?: undefined;
    } | {
        code: number;
        message: any;
        target?: undefined;
    }>;
}
export { SwapSdk };
