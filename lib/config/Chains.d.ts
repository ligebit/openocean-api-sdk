export declare enum ChainNames {
    "eth" = 0,
    "rinkeby" = 1,
    "ropsten" = 2,
    "bsc" = 3,
    "solana" = 4,
    "polygon" = 5,
    "avax" = 6,
    "fantom" = 7,
    "arbitrum" = 8,
    "terra" = 9,
    "xdai" = 10,
    "boba" = 11,
    "ont" = 12,
    "tron" = 13,
    "heco" = 14,
    "okex" = 15,
    "optimism" = 16,
    "harmony" = 17,
    "dot" = 18,
    "neo" = 19
}
export declare class Chains {
    ethereumChainParams: any;
    chainObj: any;
    chainList: any[];
    constructor();
    isNativeToken(chainName: string, address: string): boolean;
}
export declare const chains: Chains;
