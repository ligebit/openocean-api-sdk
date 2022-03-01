
import { Api, api } from './api';
import { Utils, utils } from './utils';
import { Web3, web3 } from './utils/web3';
import { SwapSdk } from './swapSdk';
import { config, Config } from './config';

export class OpenoceanApiSdk {
  swapSdk: SwapSdk = new SwapSdk()
  api: Api = api
  web3: Web3 = web3
  utils: Utils = utils
  config: Config = config
}

