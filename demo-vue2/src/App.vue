<template>
  <div id="app">
    <div>{{address}}</div>

    <button @click="getBalance">getBalance</button>
    <button @click="getAllowance">getAllowance</button>

    <button @click="connectWallet">连接钱包</button>
    <button @click="quote">报价quote</button>
    <div class="">{{ quoteValue }}</div>
    <button @click="swap">交易swap</button>
  </div>
</template>

<script>
// import web3 from 'web3';
// console.log(web3)


import {OpenoceanApiSdk} from 'openocean-api-sdk';
const api = new OpenoceanApiSdk()

debugger
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
        account: '0x9548f567Aa2bf71a6691B634F9808346C804c0D0',
        chainId: '1',
        inTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        contractAddress: '0xa0x8e8bd01b5A9eb272CC3892a2E40E64A716aa2A400b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
      })
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    }
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
