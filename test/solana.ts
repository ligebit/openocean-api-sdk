
import openoceanSdk, { swapBoba } from '../src/index';

async function init() {
  let sdk = openoceanSdk
  let dexs = sdk.swapBoba.dexs
  console.log(JSON.stringify(dexs))

  let quote = await sdk.swapBoba.quote({
    amount: 10 ** 18 + '',
    inTokenSymbol: 'BUSD',
    outTokenSymbol: 'USDC'
  })
  console.log(JSON.stringify(quote))

  let swap = await sdk.swapBoba.swap({
    account: '5LVT5qWEFNxJD1yz3guroQQ6x1LaeU1vdnYn59q5hihW',
    amount: '1000000000',
    inTokenSymbol: 'SOL',
    outTokenSymbol: 'USDC',
  })
  console.log(JSON.stringify(swap))
}

init()