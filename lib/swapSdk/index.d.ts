import { ReqConnectWalletVo, ReqApproveVo } from "./RequestVo";
import { Approve } from "./Approve";
import { Swap, ReqSwapVo } from "./Swap";
declare class SwapSdk {
    i: number;
    chain: any;
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
    connectWallet(reqConnectWalletVo: ReqConnectWalletVo): Promise<any>;
    getWallet(): Promise<any>;
    getChain(): Promise<any>;
}
export { SwapSdk };
