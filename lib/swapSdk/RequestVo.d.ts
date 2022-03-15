import { ChainName } from "../api/vo/RequestVo";
export declare class ReqConnectWalletVo extends ChainName {
    walletName: string;
}
export declare class ReqApproveVo extends ChainName {
    tokenAddress: string;
    contractAddress: string;
    amount: string;
    gasPrice: Number;
    tokenAbi: any;
}
