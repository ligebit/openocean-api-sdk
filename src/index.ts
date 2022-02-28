
import { Api } from './api';
import { Utils, utils } from './utils';
import { Web3, web3 } from './utils/web3';
import { SwapSdk } from './swapSdk';
import { config, Config } from './config';

export class OpenoceanApiSdk {
  api: Api = new Api()
  swapSdk: SwapSdk = new SwapSdk()
  web3: Web3 = web3
  utils: Utils = utils
  config: Config = config
}

