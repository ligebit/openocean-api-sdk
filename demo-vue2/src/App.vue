<template>
  <div id="app">
    <div style="height: 50px;">{{address}}</div>

    <button @click="getBalance">getBalance</button>
    <button @click="getAllowance">getAllowance</button>
    <button @click="getTokenPrice">getTokenPrice</button>
    <button @click="getTokenInfo">getTokenInfo</button>
    <button @click="getTokenList">getTokenList</button>
    <button @click="createWallet">createWallet</button>
    <button @click="getTransaction">getTransaction</button>

    <button @click="getGasPrice">getGasPrice</button>
    <div>
      <h2>Ropsten</h2>
      <button @click="connectWallet('MetaMask','ropsten')">connectWallet ropsten</button>
      <button @click="approve()">approve ropsten</button>
    </div>
    <div>
      <h2>Bsc</h2>
      <button @click="connectWallet('MetaMask','bsc')">connectWallet</button>
      <button @click="quoteBsc">quoteBsc</button>
      <button @click="swapBsc">swapBsc</button>
      <button @click="transfer">transfer</button>
    </div>
    <div>
      <h2>Solana</h2>
      <button @click="connectWallet('Phantom','solana')">connectWallet</button>
      <button @click="quoteSolana">quoteSolana</button>
      <button @click="swapSolana">swapSolana</button>
    </div>

    <div>
      <h2>Tron</h2>
      <button @click="connectWallet('TronLink','tron')">connectWallet</button>
      <button @click="quoteTron">quoteTron</button>
      <button @click="swapTron">swapTron</button>
    </div>

    <div style="color:red;height:40px">{{message}}</div>
    <div v-if="wallet" style="color:blue">
      <div>chain:{{chain.chainName}}</div>
      <div> walletName:{{wallet.name}}</div>
      <div>address:{{wallet.address}}</div>
    </div>
    <div class="chainBox" v-for="(item,i) in chainList" :key='i' style="">
      <div class="h1">{{item.chainName}} ({{item.key}})</div>
      <div style="padding-left:20px">
        <span @click="connectWallet(obj,item.key)" class="item" v-for="(obj,j) in item.wallets" :key="j">
          {{obj}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import { OpenoceanApiSdk } from '@openocean.finance/api';

const openoceanApiSdk = new OpenoceanApiSdk()
const { api, swapSdk, config } = openoceanApiSdk
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      address: null,
      quoteValue: null,
      wallet: {
        chain: '',
        name: ''
      },
      chain: {},
      message: null,
      walletObj: config.wallets.walletObj,
      chainList: config.chains.chainList
    }
  },
  async created () {
    this.wallet = await swapSdk.getWallet()
    this.chain = await swapSdk.getChain()
  },
  methods: {
    async connectWallet (walletName, chain) {
      this.message = null
      let data = await swapSdk.connectWallet({
        chain: chain,
        walletName: walletName
      })
      if (data.code == 200) {
        this.wallet = swapSdk.wallet
        this.chain = swapSdk.chain
      } else {
        this.message = data.message
      }
    },
    async approve () {
      // let req = await api.getGasPrice({
      //   chain: 'ropsten',
      // })
      // debugger
      let approve = await swapSdk.approve({
        chain: 'ropsten',
        tokenAddress: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
        contractAddress: '0x40d3b2f06f198d2b789b823cdbecd1db78090d74',
        amount: 2 * (10 ** 18),
        // gasPrice: req.data.gasPrice,
      })
      if (!approve.code) {
        approve.on('error', (error) => {
          debugger
        })
          .on('transactionHash', (hash) => {
            debugger
          })
          .on('receipt', (data) => {
            debugger
          })
          .on('success', (data) => {
            debugger
          })
      } else {
        this.message = approve.message
        debugger
      }

    },
    async quoteTron () {
      let req = await api.getGasPrice({
        chain: 'tron',
      })
      api.quote({
        chain: 'tron',
        inTokenAddress: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
        outTokenAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
        amount: 1,
        gasPrice: req.data.gasPrice,
        slippage: 1,
      })
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },
    async swapTron () {
      let req = await api.getGasPrice({
        chain: 'tron',
      })
      let swapObj = swapSdk.swap({
        chain: 'tron',
        inTokenAddress: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
        outTokenAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
        amount: 0.001,
        slippage: 1,
        account: 'TPyNMWvKsmyYpuM4NdKiK58DCvDNHQsPWG',
        gasPrice: req.data.gasPrice,
      })
      if (!swapObj.code) {
        swapObj.on('error', (error) => {
          debugger
        })
          .on('transactionHash', (hash) => {
            debugger
          })
          .on('receipt', (data) => {
            debugger
          })
          .on('success', (data) => {
            debugger
          })
      } else {
        this.message = swapObj.message
        debugger
      }

    },
    async quoteSolana () {
      api.quote({
        chain: 'solana',
        inTokenAddress: 'So11111111111111111111111111111111111111112',
        outTokenAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        amount: 1,
        // gasPrice: req.data.gasPrice,
        slippage: 1,
      })
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },
    async swapSolana () {
      let swapObj = swapSdk.swap({
        chain: 'solana',
        inTokenAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        outTokenAddress: 'So11111111111111111111111111111111111111112',
        amount: 0.001,
        slippage: 1,
        account: '5LVT5qWEFNxJD1yz3guroQQ6x1LaeU1vdnYn59q5hihW',
        // gasPrice: 7,
      })
      if (!swapObj.code) {
        swapObj.on('error', (error) => {
          debugger
        })
          .on('transactionHash', (hash) => {
            debugger
          })
          .on('receipt', (data) => {
            debugger
          })
          .on('success', (data) => {
            debugger
          })
      } else {
        this.message = swapObj.message
        debugger
      }

    },
    async quoteBsc () {
      let req = await api.getGasPrice({
        chain: 'bsc',
      })
      api.quote({
        chain: 'bsc',
        inTokenAddress: '0x55d398326f99059ff775485246999027b3197955',
        outTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        amount: '7',
        gasPrice: req.data.gasPrice,
        slippage: 100,
      })
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },
    async swapBsc () {
      let req = await api.getGasPrice({
        chain: 'bsc',
      })
      let swapObj = swapSdk.swap({
        chain: 'bsc',
        // inTokenAddress: '0x55d398326f99059ff775485246999027b3197955',
        // outTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        inTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        outTokenAddress: '0x55d398326f99059ff775485246999027b3197955',
        amount: '0.1',
        gasPrice: req.data.gasPrice,
        slippage: 100,
        account: '0x9548f567Aa2bf71a6691B634F9808346C804c0D0',
        // in_token_decimals: 18,
        // out_token_decimals: 9,
      })
      if (!swapObj.code) {
        swapObj.on('error', (error) => {
          debugger
        })
          .on('transactionHash', (hash) => {
            debugger
          })
          .on('receipt', (data) => {
            debugger
          })
          .on('success', (data) => {
            debugger
          })
      } else {
        this.message = swapObj.message
        debugger
      }

    },
    getBalance () {
      let sd = api.getBalance({
        account: '0x9548f567Aa2bf71a6691B634F9808346C804c0D0',
        chain: 'BSC',
        inTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      }).then((data) => {
        debugger
      })
        .catch((error) => {
          debugger
        });
    },
    getAllowance () {
      api.getAllowance({
        account: '0xf8953d8671644348303cfa8Ae408F5d9fb884761',
        chain: 'bsc',
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
    getGasPrice () {
      api.getGasPrice({
        chain: 'bsc',
      })
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },
    getTokenList () {
      api.getTokenList({
        chain: 'BSC',
      })
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },
    getTransaction (chain) {
      api.getTransaction({
        chain: chain,
        hash: '0x98250e03ed1b61d4d2857758fa597511a84225c6229b20a1349382b5541b5461',
        type: 'transfer'
      })
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },


    createWallet () {
      api.createWallet({
        chain: 'BSC',
      })
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },
    async transfer () {
      let req = await api.getGasPrice({
        chain: 'BSC',
      })
      api.transfer({
        chain: 'BSC',
        inTokenAddress: '0x9029FdFAe9A03135846381c7cE16595C3554e10A',
        amount: 1,
        gasPrice: req.data.gasPrice,
        decimals: 18,
        walletAddress: '0x929B44e589AC4dD99c0282614e9a844Ea9483C69'
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

<style sty>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.chainBox {
}
.chainBox .h1 {
  font-weight: bold;
}
.chainBox .item {
  cursor: pointer;
  margin: 6px;
  display: inline-block;
  border: 1px solid #ededed;
  border-radius: 4px;
  padding: 2px 5px;
  font-size: 12px;
  color: #000;
}
.chainBox .item:hover {
  color: blue;
}
</style>
