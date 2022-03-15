export declare class Chains {
    ethereumChainParams: any;
    chainObj: any;
    chainList: any[];
    chainIds: String[];
    chainNames: String[];
    constructor();
    isNativeToken(chainName: string, address: string): boolean;
}
export declare const chains: Chains;
