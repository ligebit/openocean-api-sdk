"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = exports.Wallets = exports.WalletNames = void 0;
var wallet_1 = require("@openocean.finance/wallet");
var WalletNames;
(function (WalletNames) {
    WalletNames[WalletNames["MetaMask"] = 0] = "MetaMask";
    WalletNames[WalletNames["WalletConnect"] = 1] = "WalletConnect";
    WalletNames[WalletNames["BscWallet"] = 2] = "BscWallet";
    WalletNames[WalletNames["Cyano"] = 3] = "Cyano";
    WalletNames[WalletNames["OntoMobile"] = 4] = "OntoMobile";
    WalletNames[WalletNames["TronLink"] = 5] = "TronLink";
    WalletNames[WalletNames["Sollet"] = 6] = "Sollet";
    WalletNames[WalletNames["SolletIo"] = 7] = "SolletIo";
    WalletNames[WalletNames["TrustWallet"] = 8] = "TrustWallet";
    WalletNames[WalletNames["MathWallet"] = 9] = "MathWallet";
    WalletNames[WalletNames["TokenPocket"] = 10] = "TokenPocket";
    WalletNames[WalletNames["SafePalWallet"] = 11] = "SafePalWallet";
    WalletNames[WalletNames["OntoWallet"] = 12] = "OntoWallet";
    WalletNames[WalletNames["Coin98Wallet"] = 13] = "Coin98Wallet";
    WalletNames[WalletNames["ImTokenWallet"] = 14] = "ImTokenWallet";
    WalletNames[WalletNames["Phantom"] = 15] = "Phantom";
    WalletNames[WalletNames["OkExWallet"] = 16] = "OkExWallet";
    WalletNames[WalletNames["TerraStation"] = 17] = "TerraStation";
    WalletNames[WalletNames["CoinbaseWallet"] = 18] = "CoinbaseWallet";
})(WalletNames = exports.WalletNames || (exports.WalletNames = {}));
var WalletObj = {
    MetaMask: new wallet_1.MetaMask(),
    WalletConnect: new wallet_1.WalletConnect(),
    BscWallet: new wallet_1.BscWallet(),
    Cyano: new wallet_1.Cyano(),
    OntoMobile: new wallet_1.OntoMobile(),
    TronLink: new wallet_1.TronLink(),
    Sollet: new wallet_1.Sollet(),
    SolletIo: new wallet_1.SolletIo(),
    TrustWallet: new wallet_1.TrustWallet(),
    MathWallet: new wallet_1.MathWallet(),
    TokenPocket: new wallet_1.TokenPocket(),
    SafePalWallet: new wallet_1.SafePalWallet(),
    OntoWallet: new wallet_1.OntoWallet(),
    Coin98Wallet: new wallet_1.Coin98(),
    ImTokenWallet: new wallet_1.ImTokenWallet(),
    Phantom: new wallet_1.Phantom(),
    OkExWallet: new wallet_1.OKExWallet(),
    TerraStation: new wallet_1.TerraStation(),
    CoinbaseWallet: new wallet_1.CoinbaseWallet(),
};
var Wallets = /** @class */ (function () {
    function Wallets() {
        this.walletObj = {};
        this.walletList = [];
        WalletObj.MetaMask.supportChains.push('rinkeby');
        WalletObj.MetaMask.supportChains.push('ropsten');
        this.walletObj = WalletObj;
        this.walletList = Object.keys(WalletObj).map(function (key) {
            WalletObj[key].key = key;
            return WalletObj[key];
        });
    }
    return Wallets;
}());
exports.Wallets = Wallets;
exports.wallets = new Wallets();
