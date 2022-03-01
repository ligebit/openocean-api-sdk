import { ReqBase } from "../api/vo/RequestVo";
export declare class ReqConnectWalletVo {
    chainName: string;
    walletName: string;
}
export declare class ReqApproveVo extends ReqBase {
    tokenAddress: string;
    contractAddress: string;
    amount: string;
    gasPrice: Number;
    tokenAbi: any;
}
