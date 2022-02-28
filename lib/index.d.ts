import { Api } from './api';
import { Utils } from './utils';
import { Web3 } from './utils/web3';
import { SwapSdk } from './swapSdk';
import { Config } from './config';
export declare class OpenoceanApiSdk {
    api: Api;
    swapSdk: SwapSdk;
    web3: Web3;
    utils: Utils;
    config: Config;
}
