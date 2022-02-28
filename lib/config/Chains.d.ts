export declare enum ChainNames {
    "eth" = 0,
    "bsc" = 1,
    "solana" = 2,
    "polygon" = 3,
    "avax" = 4,
    "fantom" = 5,
    "arbitrum" = 6,
    "terra" = 7,
    "xdai" = 8,
    "boba" = 9,
    "ont" = 10,
    "tron" = 11,
    "heco" = 12,
    "okex" = 13,
    "optimism" = 14,
    "harmony" = 15,
    "dot" = 16,
    "neo" = 17
}
export declare class Chains {
    ethereumChainParams: any;
    chainObj: any;
    chainList: any[];
    constructor();
}
export declare const chains: Chains;
