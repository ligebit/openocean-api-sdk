import { Approve, ReqAllowanceVo } from "./vo/Approve";
import { ReqBanlanceVo } from "./vo/Balance";
export declare class Api {
    URL: string;
    private _validate;
    private _get;
    getBalance(option: ReqBanlanceVo): Promise<any>;
    getAllowance(option: ReqAllowanceVo): Promise<any>;
    approve(params: object): Approve;
    quote(): void;
    swap(): void;
    getTokenPrice(): void;
    getTokeninfo(): void;
}
