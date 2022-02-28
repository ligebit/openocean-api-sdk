import { Wallets } from "./Wallets";
import { Chains } from "./Chains";
export interface Config {
    chains: Chains;
    wallets: Wallets;
}
export declare const config: Config;
