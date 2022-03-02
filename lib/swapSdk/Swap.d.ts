import { ReqSwapVo } from "../api/vo/RequestVo";
export { ReqSwapVo };
export declare class Swap {
    private errorCallback;
    private transactionHashCallback;
    private receiptCallback;
    private successCallback;
    contract: any;
    option: ReqSwapVo;
    res: any;
    target: any;
    constructor(option: ReqSwapVo);
    send(target: any): Promise<this>;
    sendEthTransaction(): Promise<void>;
    on(events: string, callback: Function): this;
}
