import { ReqApproveVo } from "./RequestVo";
export declare class Approve {
    errorCallback: Function;
    transactionHashCallback: Function;
    receiptCallback: Function;
    successCallback: Function;
    contract: any;
    contractAddress: string;
    tokenAddress: string;
    account: string;
    amount: string;
    key: number;
    constructor(contract: any);
    send(reqApproveVo: ReqApproveVo, address: string): Promise<void>;
    on(events: string, callback: Function): this;
    getSuccess(): Promise<void>;
}
