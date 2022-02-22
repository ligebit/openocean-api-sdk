
import SwapSdk, { Api, units } from '../src/index';
// import SwapSdk, { Api, units } from 'openocean-api-sdk';

async function init() {
  let sdk = new SwapSdk()
  console.log(sdk)
}

init()