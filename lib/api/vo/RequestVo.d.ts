import 'reflect-metadata';
export declare class ReqBase {
    chainId: string;
}
export declare class ChainName {
    chain: string;
}
export declare class ReqBanlanceVo extends ChainName {
    account: string;
    inTokenAddress: string;
}
export declare class ReqAllowanceVo extends ChainName {
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
export declare class ReqQuoteVo extends ChainName {
    exChange: string | 'openoceanv2';
    inTokenAddress: string;
    outTokenAddress: string;
    amount: Number;
    gasPrice: Number;
    slippage: Number;
    in_token_decimals: Number;
    out_token_decimals: Number;
    withRoute: String;
}
export declare class ReqSwapVo extends ChainName {
    exChange: string | 'openoceanv2';
    inTokenAddress: string;
    outTokenAddress: string;
    amount: Number;
    gasPrice: Number;
    slippage: Number;
    account: String;
    referrer: String;
    in_token_decimals: Number;
    out_token_decimals: Number;
    withoutCheckBalance: Boolean;
}
export declare class ReqTransactionReceiptVo extends ChainName {
    exChange: string | 'openoceanv2';
    hash: string;
}
export declare class ReqTransactionVo extends ReqTransactionReceiptVo {
    type: string;
}
export declare class ReqtransferVo extends ChainName {
    inTokenAddress: string;
    decimals: Number;
    amount: Number;
    gasPrice: Number;
    targetAddress: Number;
}
