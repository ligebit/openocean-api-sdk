import { ReqtransferVo, ReqTransactionReceiptVo, ChainName, ReqTransactionVo, ReqSwapVo, ReqBanlanceVo, ReqAllowanceVo, ReqTokenPriceVo, ReqTokenInfoVo, ReqQuoteVo } from "./vo/RequestVo";
export declare class Api {
    UrlOpenApi: string;
    UrlCoingecKo: string;
    getBalance(option: ReqBanlanceVo): Promise<any>;
    getAllowance(option: ReqAllowanceVo): Promise<any>;
    getGasPrice(option: any): Promise<any>;
    quote(option: ReqQuoteVo): Promise<any>;
    swap(option: ReqSwapVo): Promise<any>;
    getTokenList(option: ChainName): Promise<any>;
    createWallet(option: ChainName): Promise<any>;
    getTransaction(option: ReqTransactionVo): Promise<any>;
    getTransactionReceipt(option: ReqTransactionReceiptVo): Promise<any>;
    transfer(option: ReqtransferVo): Promise<any>;
    getTokenPrice(option: ReqTokenPriceVo): Promise<any>;
    getTokenInfo(option: ReqTokenInfoVo): Promise<any>;
}
export declare let api: Api;
