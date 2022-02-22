
// import { swapSolana } from '../lib/index.js';
// require('../browser.js');
const openoceanSdk=require('../lib/index.js');
// import openoceanSdk from './../lib/index.js';

async function init () {
  let sdk = openoceanSdk.swapSolana
  let dexs = swapSolana.dexs
  console.log(JSON.stringify(dexs))

  let quote = await swapSolana.quote({
    amount: '1000000000',
    inTokenSymbol: 'SOL',
    outTokenSymbol: 'USDC'
  })
  console.log(JSON.stringify(quote))

  let swap = await swapSolana.swap({
    account: '5LVT5qWEFNxJD1yz3guroQQ6x1LaeU1vdnYn59q5hihW',
    amount: '1000000000',
    inTokenSymbol: 'SOL',
    outTokenSymbol: 'USDC',
  })
  console.log(JSON.stringify(swap))
}

init()