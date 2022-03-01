export declare enum ChainNames {
    "eth" = 0,
    "rinkeby" = 1,
    "bsc" = 2,
    "solana" = 3,
    "polygon" = 4,
    "avax" = 5,
    "fantom" = 6,
    "arbitrum" = 7,
    "terra" = 8,
    "xdai" = 9,
    "boba" = 10,
    "ont" = 11,
    "tron" = 12,
    "heco" = 13,
    "okex" = 14,
    "optimism" = 15,
    "harmony" = 16,
    "dot" = 17,
    "neo" = 18
}
export declare class Chains {
    ethereumChainParams: any;
    chainObj: any;
    chainList: any[];
    constructor();
}
export declare const chains: Chains;
