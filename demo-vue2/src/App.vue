<template>
  <div id="app">
    <div>{{address}}</div>

    <button @click="getBalance">getBalance</button>
    <button @click="getAllowance">getAllowance</button>
    <button @click="getTokenPrice">getTokenPrice</button>
    <button @click="getTokenInfo">getTokenInfo</button>
    <button @click="getTokenList">getTokenList</button>
    <button @click="createWallet">createWallet</button>
    <button @click="getTransaction">getTransaction</button>

    <button @click="getGasPrice">getGasPrice</button>
    <button @click="quote">quote</button>
    <button @click="swap">swap</button>
    <button @click="transfer">transfer</button>

    <button @click="connectWallet('MetaMask','rinkeby')">connectWallet</button>
    <button @click="approve()">approve</button>

    <div style="color:red;height:40px">{{message}}</div>
    <div v-if="target" style="color:blue">chainId:{{target.chainId}} walletName:{{target.name}}</div>
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

import { OpenoceanApiSdk } from 'openocean-api-sdk';
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
      target: {
        chainId: '',
        name: ''
      },
      message: null,
      walletObj: config.wallets.walletObj,
      chainList: config.chains.chainList
    }
  },
  methods: {
    async connectWallet (walletName, chainName) {
      this.message = null
      let data = await swapSdk.connectWallet({
        chainName: chainName,
        walletName: walletName
      })
      if (data.code == 200) {
        let sdd = this.target = data.target
      } else {
        this.message = data.message
      }
    },
    async approve () {
      // let req = await api.getGasPrice({
      //   chainId: '4',
      // })
      // debugger
      let approve = await swapSdk.approve({
        chainId: '4',
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
    async swap () {
      let req = await api.getGasPrice({
        chainId: '56',
      })
      let swap = swapSdk.swap({
        exChange: 'openoceanv2',
        chainId: '56',
        inTokenAddress: '0x55d398326f99059ff775485246999027b3197955',
        outTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        amount: '7300000000',
        gasPrice: req.data.gasPrice,
        slippage: 1,
        account: '0x9548f567Aa2bf71a6691B634F9808346C804c0D0'
      })
        .on('error', (error) => {
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
      debugger

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
    getGasPrice () {
      api.getGasPrice({
        chainId: '56',
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
        chainId: '56',
      })
        .then((data) => {
          debugger
        })
        .catch((error) => {
          debugger
        });
    },
    getTransaction () {
      api.getTransaction({
        exChange: 'openoceanv2',
        chainId: '56',
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
    async quote () {
      let req = await api.getGasPrice({
        chainId: '56',
      })
      api.quote({
        exChange: 'openoceanv2',
        chainId: '56',
        inTokenAddress: '0x9029FdFAe9A03135846381c7cE16595C3554e10A',
        outTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        amount: 1,
        gasPrice: req.data.gasPrice,
        slippage: 1
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
        chainId: '56',
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
        chainId: '56',
      })
      api.transfer({
        chainId: '56',
        inTokenAddress: '0x9029FdFAe9A03135846381c7cE16595C3554e10A',
        amount: 1,
        gasPrice: req.data.gasPrice,
        decimals: 18,
        targetAddress: '0x929B44e589AC4dD99c0282614e9a844Ea9483C69'
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
