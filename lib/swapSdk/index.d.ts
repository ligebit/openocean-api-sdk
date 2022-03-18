import { ReqConnectWalletVo, ReqApproveVo } from "./RequestVo";
import { Approve } from "./Approve";
import { Swap, ReqSwapVo } from "./Swap";
declare class SwapSdk {
    i: number;
    chain: any;
    wallet: any;
    constructor();
    swapQuote(reqSwapVo: ReqSwapVo): Promise<any>;
    swap(swapData: any): Swap;
    approve(reqApproveVo: ReqApproveVo): Promise<Approve | {
        code: number;
        message: string;
    }>;
    connectWallet(reqConnectWalletVo: ReqConnectWalletVo): Promise<any>;
    getWallet(): Promise<any>;
    getChain(): Promise<any>;
}
export { SwapSdk };
