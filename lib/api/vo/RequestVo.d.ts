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
    inTokenAddress: string;
    outTokenAddress: string;
    amount: Number;
    slippage: Number;
    gasPrice: String;
}
export declare class ReqSwapVo extends ChainName {
    inTokenAddress: string;
    outTokenAddress: string;
    amount: Number;
    slippage: Number;
    account: String;
    gasPrice: String;
}
export declare class ReqTransactionReceiptVo extends ChainName {
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
