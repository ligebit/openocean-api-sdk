
import OpenoceanApiSdk from '../src/index';

async function init() {
  let { api } = new OpenoceanApiSdk()

  try {

    api.approve({
      account: '0x9548f567Aa2bf71a6691B634F9808346C804c0D0',
      chainId: '1',
      inTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    }).on('error', (data: string) => {
      console.log(data)
    })

  } catch (error) {
    console.log('error')

  }

}

init()

