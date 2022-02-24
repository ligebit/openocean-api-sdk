
import { Api } from './api';
import { Units } from './units';
import SwapSdk from './swapSdk';
import Web3 from 'web3';

const web3 = new Web3()
const units = new Units()


export class OpenoceanApiSdk {
  api: Api = new Api()
  SwapSdk: SwapSdk = new SwapSdk()
  web3: Web3 = web3
  units: Units = units

}

// export OpenoceanApiSdk
