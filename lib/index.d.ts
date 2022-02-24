import { Api } from './api';
import { Units } from './units';
import SwapSdk from './swapSdk';
import Web3 from 'web3';
export declare class OpenoceanApiSdk {
    api: Api;
    SwapSdk: SwapSdk;
    web3: Web3;
    units: Units;
}
