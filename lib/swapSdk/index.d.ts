import { ReqConnectWalletVo, ReqApproveVo } from "./RequestVo";
import { Approve } from "./Approve";
import { Swap, ReqSwapVo } from "./Swap";
declare class SwapSdk {
    target: any;
    constructor();
    swap(option: ReqSwapVo): Swap;
    approve(reqApproveVo: ReqApproveVo): Promise<Approve | {
        code: number;
        message: string;
    }>;
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
