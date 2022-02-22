import { BaseWallet } from './wallets';
declare class SwapSdk {
    connectWallet(chainId: number, walletObj: BaseWallet): void;
}
export default SwapSdk;
