
import { wallets, Wallets } from "./Wallets";
import { chains, Chains } from "./Chains";

export interface Config {
  chains: Chains,
  wallets: Wallets,
}


export const config: Config = {
  chains: chains,
  wallets: wallets,
}
