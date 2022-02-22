<template>
  <div id="app">
    <div>{{address}}</div>
    <button @click="connectWallet">连接钱包</button>
    <button @click="quote">报价quote</button>
    <div class="">{{ quoteValue }}</div>
    <button @click="swap">交易swap</button>
  </div>
</template>

<script>
import { MetaMask, BscWallet } from "@openocean.finance/wallet";

// import SwapSdk, { Api, units } from 'openocean-api-sdk';

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
  }
}
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
button {
  display: block;
}
</style>
