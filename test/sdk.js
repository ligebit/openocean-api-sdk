
const Api = require('../dist/index.js').Api;

async function init () {
  let api = new Api()
  await api.getBalance({
    account: '0x9548f567Aa2bf71a6691B634F9808346C804c0D0',
    chainId: '1',
    inTokenAddress2: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  })

}

init()


