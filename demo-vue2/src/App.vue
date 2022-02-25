<template>
  <div id="app">
    <div>{{address}}</div>

    <button @click="getBalance">getBalance</button>
    <button @click="getAllowance">getAllowance</button>
    <button @click="getTokenPrice">getTokenPrice</button>
    <button @click="getTokenInfo">getTokenInfo</button>

    <button @click="connectWallet">连接钱包</button>
    <button @click="quote">报价quote</button>
    <div class="">{{ quoteValue }}</div>
    <button @click="swap">交易swap</button>
  </div>
</template>

<script>
// import web3 from 'web3';
// console.log(web3)


import { OpenoceanApiSdk } from 'openocean-api-sdk';
const openoceanApiSdk = new OpenoceanApiSdk()
const { api } = openoceanApiSdk
// debugger
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      address: null,
      quoteValue: null
    }
  },
  methods: {
    connectWallet () {
      // let swapSdk = new SwapSdk()
      // debugger
      // swapSdk.connectWallet(1, new MetaMask())
      // console.log(swapSdk)
    },
    quote () {

    },
    swap () {

    },
    getBalance () {
      api.getBalance({
        account: '0x9548f567Aa2bf71a6691B634F9808346C804c0D0',
        chainId: '1',
        inTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      })
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },
    getAllowance () {
      api.getAllowance({
        account: '0xf8953d8671644348303cfa8Ae408F5d9fb884761',
        chainId: '56',
        inTokenAddress: '0x9029FdFAe9A03135846381c7cE16595C3554e10A,0x08ba0619b1e7a582e0bce5bbe9843322c954c340',
        contractAddress: '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64'
      })
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },
    getTokenPrice () {
      api.getTokenPrice(
        {
          ids: 'bitcoin',
          vs_currencies: 'usd'
        }
      )
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },
    getTokenInfo () {
      api.getTokenInfo(
        {
          id: 'binance-smart-chain',
          contract_address: '0x9029FdFAe9A03135846381c7cE16595C3554e10A'
        }
      )
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },
  }
}

// import HelloWorld from './components/HelloWorld.vue'

// export default {
//   name: 'App',
//   components: {
//     HelloWorld
//   }
// }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
