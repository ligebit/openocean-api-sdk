"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = exports.Chains = void 0;
var Wallets_1 = require("./Wallets");
var chainObj = {
    "eth": {
        chainName: "Ethereum Mainnet",
        chainId: 1,
        blockExplorerUrl: "https://etherscan.io/tx/",
        nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
        popularToken: ["ETH", "USDT", "USDC", "BUSD", "UNI", "C98", "LINK", "MATIC"],
        rpcUrls: [
            "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        ],
        compiler: 'EVM'
    },
    "ropsten": {
        chainName: "Ethereum Ropsten",
        chainId: 3,
        blockExplorerUrl: "https://ropsten.etherscan.io/",
        nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
        popularToken: ["ETH", "USDT", "USDC", "BUSD", "UNI", "C98", "LINK", "MATIC"],
        rpcUrls: [
            "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        ],
        compiler: 'EVM',
        isTest: true
    },
    "rinkeby": {
        chainName: "Ethereum Rinkeby",
        chainId: 4,
        blockExplorerUrl: "https://rinkeby.etherscan.io/",
        nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
        popularToken: ["ETH", "USDT", "USDC", "BUSD", "UNI", "C98", "LINK", "MATIC"],
        rpcUrls: [
            "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        ],
        compiler: 'EVM',
        isTest: true
    },
    "bsc": {
        chainName: "Binance Smart Chain", chainId: 56, blockExplorerUrl: "https://bscscan.com/tx/",
        popularToken: ["OOE", "BNB", "USDT", "BUSD", "CAKE", "C98", "BAKE", "MBOX"],
        nativeCurrency: { name: "BNB", symbol: "bnb", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
        rpcUrls: ["https://bsc-dataseed1.binance.org/"],
        compiler: 'EVM',
    },
    "solana": {
        compiler: 'SOL',
        chainName: "Solana Mainnet", blockExplorerUrl: "https://solscan.io/tx/", popularToken: ["SOL", "SNY", "USDT", "USDC", "RAY", "STEP"], rpcUrls: null
    },
    "polygon": {
        compiler: 'EVM',
        chainName: "Polygon Mainnet", chainId: 137, blockExplorerUrl: "https://polygonscan.com/tx/", popularToken: ["OOE", "USDT", "USDC", "MATIC", "AAVE", "DINO", "ADDY", "MIMATIC"], nativeCurrency: { name: "MATIC", symbol: "matic", decimals: 18, address: "0x0000000000000000000000000000000000001010" }, rpcUrls: ["https://rpc-mainnet.maticvigil.com"]
    },
    "avax": {
        compiler: 'EVM',
        chainName: "Avalanche", chainId: 43114, blockExplorerUrl: "https://cchain.explorer.avax.network/tx/", popularToken: ["OOE", "AVAX", "PNG", "DAI.E", "ETH", "WAVAX", "JOE", "QI", "USDC.E"], nativeCurrency: { name: "AVAX", symbol: "avax", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"]
    },
    "fantom": {
        compiler: 'EVM',
        chainName: "Fantom", chainId: 250, blockExplorerUrl: "https://ftmscan.com/tx/", popularToken: ["OOE", "ETH", "USDT", "USDC", "SPIRIT", "1INCH", "C98", "FTM", "fUSDT", "MIM", "BOO"], nativeCurrency: { name: "FTM", symbol: "ftm", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://rpcapi.fantom.network"]
    },
    "arbitrum": {
        compiler: 'EVM',
        chainName: "Arbitrum", chainId: 42161, blockExplorerUrl: "https://arbiscan.io/tx/", nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" }, rpcUrls: ["https://arb1.arbitrum.io/rpc"]
    },
    "terra": {
        compiler: 'TERRA',
        chainName: "Terra Mainnet", blockExplorerUrl: "https://finder.terra.money/columbus-5/tx/", rpcUrls: null
    },
    "xdai": {
        compiler: 'EVM',
        chainName: "Gnosis Mainnet", chainId: 100, blockExplorerUrl: "https://blockscout.com/poa/xdai/tx/", popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"], nativeCurrency: { name: "xDai", symbol: "xdai", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://rpc.xdaichain.com/"]
    },
    "boba": {
        compiler: 'EVM',
        chainName: "Boba Mainnet", chainId: 288, blockExplorerUrl: "https://blockexplorer.boba.network/tx/", nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://mainnet.boba.network"]
    },
    "ont": {
        compiler: 'ONT',
        chainName: "Ontology Mainnet", blockExplorerUrl: "https://explorer.ont.io/transaction/", popularToken: [], rpcUrls: null
    },
    "tron": {
        compiler: 'TRON',
        chainName: "Tron Mainnet", blockExplorerUrl: "https://tronscan.io/#/transaction/", popularToken: ["TRX", "WTRX", "ETH", "BTC", "USDT", "USDJ", "JST"], rpcUrls: null
    },
    "heco": {
        compiler: 'EVM',
        chainName: "Heco Mainnet", chainId: 128, blockExplorerUrl: "https://hecoinfo.com/tx/", popularToken: ["HT", "ETH", "AAVE", "USDT", "USDC", "MDX", "DEP"], nativeCurrency: { name: "HT", symbol: "ht", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://http-mainnet-node.huobichain.com"]
    },
    "okex": {
        compiler: 'EVM',
        chainName: "OEC Mainnet", chainId: 66, blockExplorerUrl: "https://www.oklink.com/okexchain/", popularToken: ["OKT", "OKB", "USDT", "USDC", "BUSD", "BNB", "CHE"], nativeCurrency: { name: "OKT", symbol: "okt", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://exchainrpc.okex.org"]
    },
    "optimism": {
        compiler: 'EVM',
        chainName: "Optimism", chainId: 10, blockExplorerUrl: "https://optimism.io/tx/", nativeCurrency: { name: "OETH", symbol: "oeth", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://mainnet.optimism.io"]
    },
    "harmony": {
        compiler: 'EVM',
        chainName: "Harmony", blockExplorerUrl: "https://explorer.harmony.one/", popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"]
    },
    "dot": {
        compiler: 'EVM',
        chainName: "Polkadot", blockExplorerUrl: "", popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"]
    },
    "neo": {
        compiler: 'EVM',
        chainName: "Neo", blockExplorerUrl: "", popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"]
    }
};
var Chains = /** @class */ (function () {
    function Chains() {
        var _this = this;
        this.ethereumChainParams = {
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
                    chainId: "0x38",
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
                    chainId: "0x42",
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
                    chainId: "0x89",
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
                    chainId: "0x64",
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
                    chainId: "0xfa",
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
                    chainId: "0x80",
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
                    chainId: "0xa86a",
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
                    chainId: "0x42",
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
                    chainId: "0x63564c40",
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
                    chainId: "0xa4b1",
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
                    chainId: "0xa",
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
                    chainId: "0x120",
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
        this.chainObj = {};
        this.chainList = [];
        this.chainIds = [];
        this.chainNames = [];
        Wallets_1.wallets.walletList.forEach(function (item) {
            item.supportChains.forEach(function (chainName) {
                if (chainObj[chainName] && chainObj[chainName].wallets) {
                    chainObj[chainName].wallets.push(item.key);
                }
                else {
                    if (!chainObj[chainName]) {
                        chainObj[chainName] = {};
                    }
                    chainObj[chainName].key = chainName;
                    chainObj[chainName].wallets = [item.key];
                }
            });
        });
        this.chainObj = chainObj;
        this.chainList = Object.keys(chainObj).map(function (key) {
            _this.chainIds.push(chainObj[key].chainId);
            _this.chainNames.push(key);
            return chainObj[key];
        });
        // console.log(JSON.stringify(this.chainList))
    }
    Chains.prototype.isNativeToken = function (chainName, address) {
        return this.chainObj[chainName] ? this.chainObj[chainName].nativeCurrency.address === address : false;
    };
    return Chains;
}());
exports.Chains = Chains;
exports.chains = new Chains();
