"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectWallet = void 0;
var Wallets_1 = require("../config/Wallets");
var utils_1 = require("../utils");
var web3_js_1 = require("@solana/web3.js");
var Chains_1 = require("../config/Chains");
var NotoMobile_1 = require("./NotoMobile");
var axios = require('axios');
var ConnectWallet = /** @class */ (function () {
    function ConnectWallet() {
    }
    ConnectWallet.setWalletLoacl = function (reqConnectWalletVo) {
        localStorage.setItem('opencean_link_obj', JSON.stringify(reqConnectWalletVo));
    };
    ConnectWallet.link = function (reqConnectWalletVo) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, chain, chainId, selectedChain, qrData, instance, res, res, res, _a, e_1, message, _b, currentProvider, utilsSkd, params, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        wallet = Wallets_1.wallets.walletObj[reqConnectWalletVo.walletName];
                        chain = Chains_1.chains.chainObj[reqConnectWalletVo.chain];
                        if (!chain) {
                            return [2 /*return*/, {
                                    code: 401,
                                    message: 'Chain error.'
                                }];
                        }
                        chainId = chain.chainId;
                        selectedChain = chain.key;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 16, , 28]);
                        if (!(wallet.type === 'WalletConnect')) return [3 /*break*/, 3];
                        wallet.infuraId = '2c7c4d86c2c746c89de722551b606119';
                        return [4 /*yield*/, wallet.requestConnect(chainId)
                            // this.connect(wallet);
                        ];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 15];
                    case 3:
                        if (!(wallet.name === 'ONTO Mobile')) return [3 /*break*/, 5];
                        return [4 /*yield*/, axios.get('https://ethapi.openocean.finance/v1/ont/login')];
                    case 4:
                        qrData = _c.sent();
                        wallet.qrData = qrData.data;
                        instance = new NotoMobile_1.NotoMobile(qrData.data);
                        instance.$on('close', function (action, account, result) {
                        });
                        return [3 /*break*/, 15];
                    case 5:
                        if (!(selectedChain === 'terra')) return [3 /*break*/, 8];
                        if (!!wallet.sdk) return [3 /*break*/, 7];
                        return [4 /*yield*/, wallet.requestTerraConnect()];
                    case 6:
                        res = _c.sent();
                        if (res) {
                            // this.connect(wallet);
                        }
                        else {
                            // const message = {
                            //   'XDEFI Wallet': 'wallet_message_40018',
                            //   'Terra Station': 'wallet_message_40015'
                            // }[wallet.name];
                            // showToast(this.$t(message));
                        }
                        _c.label = 7;
                    case 7: return [3 /*break*/, 15];
                    case 8:
                        if (!(selectedChain === "solana")) return [3 /*break*/, 10];
                        return [4 /*yield*/, wallet.requestSolanaConnect()];
                    case 9:
                        res = _c.sent();
                        wallet.customPublicKey = new web3_js_1.PublicKey(res);
                        wallet.connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com");
                        if (res) {
                            // this.connect(wallet);
                        }
                        else {
                            // const message = {
                            //   'Sollet': 'wallet_message_40010',
                            //   'Coin98 Wallet': 'wallet_message_40011',
                            //   'Phantom': 'wallet_message_40013',
                            //   'Clover Wallet': 'wallet_message_40017',
                            //   'Slope Wallet': 'wallet_message_40019',
                            //   'Solflare Wallet': 'wallet_message_40020',
                            // };
                            // return {
                            //   code: 401,
                            //   message: message
                            // }
                        }
                        return [3 /*break*/, 15];
                    case 10:
                        if (!chainId) return [3 /*break*/, 12];
                        return [4 /*yield*/, wallet.requestConnect(chainId)];
                    case 11:
                        _a = _c.sent();
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, wallet.requestConnect()];
                    case 13:
                        _a = _c.sent();
                        _c.label = 14;
                    case 14:
                        res = _a;
                        console.log('wallet.requestConnect', res, wallet);
                        if (res) {
                            // this.connect(wallet);
                        }
                        _c.label = 15;
                    case 15:
                        this.setWalletLoacl(reqConnectWalletVo);
                        return [2 /*return*/, {
                                code: 200,
                                sdk: { chain: chain, wallet: wallet }
                            }];
                    case 16:
                        e_1 = _c.sent();
                        message = e_1.message;
                        _b = wallet.sdk || {}, currentProvider = _b.currentProvider, utilsSkd = _b.utils;
                        if (!(message === "40006" && currentProvider)) return [3 /*break*/, 26];
                        params = Chains_1.chains.ethereumChainParams[reqConnectWalletVo.chain];
                        if (!params) return [3 /*break*/, 19];
                        return [4 /*yield*/, currentProvider.request({
                                method: "wallet_addEthereumChain",
                                params: params
                            })];
                    case 17:
                        _c.sent();
                        return [4 /*yield*/, utils_1.utils.sleep(1500)];
                    case 18:
                        _c.sent();
                        if (utilsSkd.toHex(chainId) == wallet.sdk.currentProvider.chainId) {
                            this.setWalletLoacl(reqConnectWalletVo);
                            return [2 /*return*/, {
                                    code: 200,
                                    sdk: { chain: chain, wallet: wallet }
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    code: 401,
                                    message: 'User rejected the request.'
                                }];
                        }
                        return [3 /*break*/, 25];
                    case 19:
                        if (!(chainId == '1' || chainId == '3' || chainId == '4')) return [3 /*break*/, 24];
                        _c.label = 20;
                    case 20:
                        _c.trys.push([20, 22, , 23]);
                        return [4 /*yield*/, currentProvider.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{
                                        chainId: utilsSkd.toHex(chainId)
                                    }],
                            })];
                    case 21:
                        _c.sent();
                        this.setWalletLoacl(reqConnectWalletVo);
                        return [2 /*return*/, {
                                code: 200,
                                sdk: { chain: chain, wallet: wallet }
                            }];
                    case 22:
                        error_1 = _c.sent();
                        return [2 /*return*/, {
                                code: 401,
                                message: error_1.message
                            }];
                    case 23: return [3 /*break*/, 25];
                    case 24: return [2 /*return*/, {
                            code: 500,
                            message: 'Network error'
                        }];
                    case 25: return [3 /*break*/, 27];
                    case 26: return [2 /*return*/, {
                            code: 500,
                            message: /^\d+$/.test(message) ? "wallet_message_" + message : message
                        }];
                    case 27: return [3 /*break*/, 28];
                    case 28: return [2 /*return*/];
                }
            });
        });
    };
    return ConnectWallet;
}());
exports.ConnectWallet = ConnectWallet;
