import { ReqSwapVo } from "../api/vo/RequestVo";
export { ReqSwapVo };
export declare class Swap {
    private errorCallback;
    private transactionHashCallback;
    private receiptCallback;
    private successCallback;
    contract: any;
    option: ReqSwapVo;
    constructor(option: ReqSwapVo);
    send(): Promise<void>;
    on(events: string, callback: Function): this;
}
