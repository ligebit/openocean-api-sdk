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
    wallet: any;
    chain: any;
    constructor(option: ReqSwapVo);
    send(wallet: any, chain: any): Promise<this>;
    sendONTTransaction(): Promise<void>;
    sendSolanaTransaction(): Promise<void>;
    sendEthTransaction(): Promise<void>;
    sendTronTransaction(): Promise<void>;
    sendTerraTransaction(): Promise<void>;
    private approveOnt;
    private sendOntTransaction;
    private getTerraFee;
    private getTerraMsgExecuteContract;
    on(events: string, callback: Function): this;
}
