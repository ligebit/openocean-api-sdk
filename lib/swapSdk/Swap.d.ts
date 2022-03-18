import { ReqSwapVo } from "../api/vo/RequestVo";
export { ReqSwapVo };
export declare class Swap {
    private getDataCallback;
    private errorCallback;
    private transactionHashCallback;
    private receiptCallback;
    private successCallback;
    contract: any;
    res: any;
    wallet: any;
    chain: any;
    constructor(res: any, wallet: any, chain: any);
    send(): this;
    sendONTTransaction(): Promise<void>;
    sendSolanaTransaction(): Promise<void>;
    sendEthTransaction(): Promise<void>;
    sendTronTransaction(): Promise<void>;
    sendTerraTransaction(): Promise<void>;
    private approveOnt;
    private sendOntTransactionSdk;
    private getTerraFee;
    private getTerraMsgExecuteContract;
    on(events: string, callback: Function): this;
}
