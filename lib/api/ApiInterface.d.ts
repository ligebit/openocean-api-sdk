export interface TokenInterface {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    disabled?: boolean;
    crossTokens?: any;
}
export interface QuoteRequest {
    inToken: TokenInterface;
    outToken: TokenInterface;
    partition: number;
}
export interface Quote {
    inToken: TokenInterface;
    outToken: TokenInterface;
    inAmount: string;
    outAmount: string;
    partition: number;
}
export interface SwapRequest extends QuoteRequest {
    payer: any;
    slippage: number;
}
export interface ReqQuote {
    amount: string;
    inTokenSymbol: string;
    outTokenSymbol: string;
    disabledDexIds?: string;
    inTokenAddress?: string;
    outTokenAddress?: string;
    partition?: string;
}
export interface ReqSwap extends ReqQuote {
    account: string;
    slippage?: string;
}
export interface Dex {
    index: number;
    code: string;
    name: string;
}
export interface Token {
    index: number;
    code: string;
    name: string;
}
export interface Tokens {
    [identity: string]: TokenInterface;
}
export interface Rep {
    code: number;
    msg: string;
    data: any;
}
export interface SwapData {
}
export interface QuoteData {
}
export interface RepQuote extends Rep {
    data: Quote;
}
export interface RepSwap extends Rep {
    data: Swap;
}
export declare abstract class Swap {
    dexs: Dex[];
    abstract chainName: string;
    constructor(dexs: Dex[]);
    abstract quote(request: ReqQuote): void;
    abstract swap(request: ReqSwap): void;
    abstract verifyReqQuote(request: ReqSwap): QuoteRequest;
    abstract verifyReqSwap(request: ReqSwap): SwapRequest;
    findToken(symbol: string, address?: string): TokenInterface;
}
