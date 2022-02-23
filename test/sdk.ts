
import { Api } from '../src/index';

async function init() {
  let api = new Api()
  try {
    let sd = await api.getBalance({
      account: '0x9548f567Aa2bf71a6691B634F9808346C804c0D0',
      chainId: '1',
      inTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    })
    console.log(sd)

  } catch (error) {
    console.log('error')

  }

}

init()

