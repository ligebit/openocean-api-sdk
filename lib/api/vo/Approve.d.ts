import 'reflect-metadata';
import { ReqBase } from './Base';
export declare class ReqAllowanceVo extends ReqBase {
    inTokenAddress: string;
    account: string;
    contractAddress: string;
}
export declare class Approve {
    params: any;
    errorCallback: Function;
    transactionHashCallback: Function;
    constructor(params: any);
    send(): any;
    on(events: string, callback: Function): void;
}
