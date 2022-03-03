import { ReqConnectWalletVo, ReqApproveVo } from "./RequestVo";
import { Approve } from "./Approve";
import { Swap, ReqSwapVo } from "./Swap";
declare class SwapSdk {
    i: number;
    wallet: any;
    constructor();
    swap(reqSwapVo: ReqSwapVo): Swap | {
        code: number;
        message: string;
    };
    approve(reqApproveVo: ReqApproveVo): Promise<Approve | {
        code: number;
        message: string;
    }>;
    connectWallet(reqConnectWalletVo: ReqConnectWalletVo): Promise<{
        code: number;
        wallet: any;
        message?: undefined;
    } | {
        code: number;
        message: any;
        wallet?: undefined;
    }>;
    getWallet(): Promise<any>;
}
export { SwapSdk };
