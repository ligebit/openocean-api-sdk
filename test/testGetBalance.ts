
import { OpenoceanApiSdk } from '../src/index';

async function init() {
  let { api } = new OpenoceanApiSdk()
  try {
    let sd = await api.getBalance({
      account: '0x9548f567Aa2bf71a6691B634F9808346C804c0D0',
      chainId: '1',
      inTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    })
      .then(data => {
        console.log('data')
        console.log(data)
      })
      .catch(er => {
        console.log('er')
        console.log(er)
      })

  } catch (error) {
    console.log('error1')
  }

}

init()

