import { Approve } from "./vo/Approve";
import { ReqBanlanceVo, ReqAllowanceVo, ReqTokenPriceVo, ReqTokenInfoVo } from "./vo/RequestVo";
export declare class Api {
    UrlOpenApi: string;
    UrlCoingecKo: string;
    getBalance(option: ReqBanlanceVo): Promise<any>;
    getAllowance(option: ReqAllowanceVo): Promise<any>;
    approve(params: object): Approve;
    quote(): void;
    swap(): void;
    getTokenPrice(option: ReqTokenPriceVo): Promise<any>;
    getTokenInfo(option: ReqTokenInfoVo): Promise<any>;
    private _validate;
    private _get;
}
