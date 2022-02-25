import 'reflect-metadata';
export declare class ReqBase {
    chainId: string;
}
export declare class ReqBanlanceVo extends ReqBase {
    account: string;
    inTokenAddress: string;
}
export declare class ReqAllowanceVo extends ReqBase {
    account: string;
    inTokenAddress: string;
    contractAddress: string;
}
export declare class ReqTokenPriceVo {
    ids: string;
    vs_currencies: string;
}
export declare class ReqTokenInfoVo {
    id: string;
    contract_address: string;
}
