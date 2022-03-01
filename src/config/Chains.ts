import { wallets } from "./Wallets";

let chainObj: any = {
  "eth": {
    chainName: "Ethereum Mainnet",
    chainId: 1,
    blockExplorerUrl: "https://etherscan.io/tx/",
    nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    popularToken: ["ETH", "USDT", "USDC", "BUSD", "UNI", "C98", "LINK", "MATIC"],
    rpcUrls: [
      "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    ]
  },
  "ropsten": {
    chainName: "Ethereum Ropsten",
    chainId: 3,
    blockExplorerUrl: "https://ropsten.etherscan.io/",
    nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    popularToken: ["ETH", "USDT", "USDC", "BUSD", "UNI", "C98", "LINK", "MATIC"],
    rpcUrls: [
      "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    ]
  },
  "rinkeby": {
    chainName: "Ethereum Rinkeby",
    chainId: 4,
    blockExplorerUrl: "https://rinkeby.etherscan.io/",
    nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    popularToken: ["ETH", "USDT", "USDC", "BUSD", "UNI", "C98", "LINK", "MATIC"],
    rpcUrls: [
      "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    ]
  },
  "bsc": {
    chainName: "Binance Smart Chain", chainId: 56, blockExplorerUrl: "https://bscscan.com/tx/",
    popularToken: ["OOE", "BNB", "USDT", "BUSD", "CAKE", "C98", "BAKE", "MBOX"],
    nativeCurrency: { name: "BNB", symbol: "bnb", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    rpcUrls: ["https://bsc-dataseed1.binance.org/"]
  },
  "solana": { chainName: "Solana Mainnet", blockExplorerUrl: "https://solscan.io/tx/", popularToken: ["SOL", "SNY", "USDT", "USDC", "RAY", "STEP"], rpcUrls: null },
  "polygon": { chainName: "Polygon Mainnet", chainId: 137, blockExplorerUrl: "https://polygonscan.com/tx/", popularToken: ["OOE", "USDT", "USDC", "MATIC", "AAVE", "DINO", "ADDY", "MIMATIC"], nativeCurrency: { name: "MATIC", symbol: "matic", decimals: 18, address: "0x0000000000000000000000000000000000001010" }, rpcUrls: ["https://rpc-mainnet.maticvigil.com"] },
  "avax": { chainName: "Avalanche", chainId: 43114, blockExplorerUrl: "https://cchain.explorer.avax.network/tx/", popularToken: ["OOE", "AVAX", "PNG", "DAI.E", "ETH", "WAVAX", "JOE", "QI", "USDC.E"], nativeCurrency: { name: "AVAX", symbol: "avax", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"] },
  "fantom": { chainName: "Fantom", chainId: 250, blockExplorerUrl: "https://ftmscan.com/tx/", popularToken: ["OOE", "ETH", "USDT", "USDC", "SPIRIT", "1INCH", "C98", "FTM", "fUSDT", "MIM", "BOO"], nativeCurrency: { name: "FTM", symbol: "ftm", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://rpcapi.fantom.network"] },
  "arbitrum": { chainName: "Arbitrum", chainId: 42161, blockExplorerUrl: "https://arbiscan.io/tx/", nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" }, rpcUrls: ["https://arb1.arbitrum.io/rpc"] },
  "terra": { chainName: "Terra Mainnet", chainId: "columbus-5", blockExplorerUrl: "https://finder.terra.money/columbus-5/tx/", rpcUrls: null },
  "xdai": { chainName: "Gnosis Mainnet", chainId: 100, blockExplorerUrl: "https://blockscout.com/poa/xdai/tx/", popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"], nativeCurrency: { name: "xDai", symbol: "xdai", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://rpc.xdaichain.com/"] },
  "boba": { chainName: "Boba Mainnet", chainId: 288, blockExplorerUrl: "https://blockexplorer.boba.network/tx/", nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://mainnet.boba.network"] },
  "ont": { chainName: "Ontology Mainnet", blockExplorerUrl: "https://explorer.ont.io/transaction/", popularToken: [], rpcUrls: null },
  "tron": { chainName: "Tron Mainnet", blockExplorerUrl: "https://tronscan.io/#/transaction/", popularToken: ["TRX", "WTRX", "ETH", "BTC", "USDT", "USDJ", "JST"], rpcUrls: null },
  "heco": { chainName: "Heco Mainnet", chainId: 128, blockExplorerUrl: "https://hecoinfo.com/tx/", popularToken: ["HT", "ETH", "AAVE", "USDT", "USDC", "MDX", "DEP"], nativeCurrency: { name: "HT", symbol: "ht", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://http-mainnet-node.huobichain.com"] },
  "okex": { chainName: "OEC Mainnet", chainId: 66, blockExplorerUrl: "https://www.oklink.com/okexchain/", popularToken: ["OKT", "OKB", "USDT", "USDC", "BUSD", "BNB", "CHE"], nativeCurrency: { name: "OKT", symbol: "okt", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://exchainrpc.okex.org"] },
  "optimism": { chainName: "Optimism", chainId: 10, blockExplorerUrl: "https://optimism.io/tx/", nativeCurrency: { name: "OETH", symbol: "oeth", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://mainnet.optimism.io"] },
  "harmony": { chainName: "Harmony", blockExplorerUrl: "https://explorer.harmony.one/", popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"] },
  "dot": { chainName: "Polkadot", blockExplorerUrl: "", popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"] },
  "neo": { chainName: "Neo", blockExplorerUrl: "", popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"] }
}
// console.log(JSON.stringify(Object.keys(chainObj).map((key: string) => key)))
export enum ChainNames {
  "eth", "rinkeby", "bsc", "solana", "polygon", "avax", "fantom", "arbitrum", "terra", "xdai", "boba", "ont", "tron", "heco", "okex", "optimism", "harmony", "dot", "neo"
}

export class Chains {
  ethereumChainParams: any = {
    // rinkeby: [
    //   {
    //     chainId: `0x4`, // 4
    //     chainName: "rinkeby",
    //     key: 'rinkeby',
    //     nativeCurrency: {
    //       name: "ETH",
    //       symbol: "eth",
    //       decimals: 18,
    //     },
    //     rpcUrls: ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    //     blockExplorerUrls: ["https://rinkeby.etherscan.io"],
    //   },
    // ],
    bsc: [
      {
        chainId: `0x38`, // 56
        chainName: "BSC Mainnet",
        nativeCurrency: {
          name: "BNB",
          symbol: "bnb",
          decimals: 18,
        },
        rpcUrls: ["https://bsc-dataseed1.binance.org/"],
        blockExplorerUrls: ["https://bscscan.com/"],
      },
    ],
    ok: [
      {
        chainId: `0x42`, // 66
        chainName: "OEC Mainnet",
        nativeCurrency: {
          name: "OKT",
          symbol: "okt",
          decimals: 18,
        },
        rpcUrls: ["https://exchainrpc.okex.org"],
        blockExplorerUrls: ["https://www.oklink.com/okexchain/"],
      },
    ],
    polygon: [
      {
        chainId: `0x89`, // 137
        chainName: "Matic Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "matic",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
        blockExplorerUrls: ["https://polygonscan.com"],
      },
    ],
    xdai: [
      {
        chainId: `0x64`, // 100
        chainName: "Gnosis Mainnet",
        nativeCurrency: {
          name: "xDai",
          symbol: "xdai",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.xdaichain.com/"],
        blockExplorerUrls: ["https://blockscout.com/xdai/mainnet"],
      },
    ],
    fantom: [
      {
        chainId: `0xfa`, // 250
        chainName: "Fantom Mainnet",
        nativeCurrency: {
          name: "FTM",
          symbol: "ftm",
          decimals: 18,
        },
        rpcUrls: ["https://rpcapi.fantom.network"],
        blockExplorerUrls: ["https://ftmscan.com/"],
      },
    ],
    heco: [
      {
        chainId: `0x80`, // 128
        chainName: "Heco Mainnet",
        nativeCurrency: {
          name: "HT",
          symbol: "ht",
          decimals: 18,
        },
        rpcUrls: ["https://http-mainnet-node.huobichain.com"],
        blockExplorerUrls: ["https://hecoinfo.com"],
      },
    ],
    avax: [
      {
        chainId: `0xa86a`, // 43114
        chainName: "Avalanche Mainnet C-Chain",
        nativeCurrency: {
          name: "AVAX",
          symbol: "avax",
          decimals: 18,
        },
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
      },
    ],
    okex: [
      {
        chainId: `0x42`, // 66
        chainName: "OEC Mainnet",
        nativeCurrency: {
          name: "OKT",
          symbol: "okt",
          decimals: 18,
        },
        rpcUrls: ["https://exchainrpc.okex.org"],
        blockExplorerUrls: ["https://www.oklink.com/okexchain"],
      },
    ],
    harmony: [
      {
        chainId: `0x63564c40`, // 1666600000
        chainName: "Harmony Mainnet",
        nativeCurrency: {
          name: "ONE",
          symbol: "one",
          decimals: 18,
        },
        rpcUrls: ["https://api.harmony.one"],
        blockExplorerUrls: ["https://explorer.harmony.one/"],
      },
    ],
    arbitrum: [
      {
        chainId: `0xa4b1`, // 42161
        chainName: "Arbitrum One",
        nativeCurrency: {
          name: "ETH",
          symbol: "eth",
          decimals: 18,
        },
        rpcUrls: ["https://arb1.arbitrum.io/rpc"],
        blockExplorerUrls: ["https://arbiscan.io"],
      },
    ],
    optimism: [
      {
        chainId: `0xa`, // 10
        chainName: "Optimism",
        nativeCurrency: {
          name: "OETH",
          symbol: "oeth",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.optimism.io"],
        blockExplorerUrls: ["https://optimism.io/"],
      },
    ],
    boba: [
      {
        chainId: `0x120`, // 288
        chainName: "Boba Mainnet",
        nativeCurrency: {
          name: "ETH",
          symbol: "eth",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.boba.network"],
        blockExplorerUrls: ["https://blockexplorer.boba.network"],
      },
    ],
  };
  chainObj: any = {}
  chainList: any[] = []

  constructor() {
    wallets.walletList.forEach((item: any) => {
      item.supportChains.forEach((chainName: string) => {
        if (chainObj[chainName] && chainObj[chainName].wallets) {
          chainObj[chainName].wallets.push(item.key)
        } else {
          console.log(chainName)
          chainObj[chainName].key = chainName
          chainObj[chainName].wallets = [item.key]
        }
      })
    })
    this.chainObj = chainObj
    this.chainList = Object.keys(chainObj).map((key: string) => chainObj[key])
  }
}
export const chains = new Chains()
