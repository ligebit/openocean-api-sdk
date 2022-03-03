"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Chains_1 = require("../config/Chains");
var ConnectWallet = /** @class */ (function () {
    function ConnectWallet() {
    }
    ConnectWallet.setWallet = function (wallet, reqConnectWalletVo, chainId) {
        wallet.chainName = reqConnectWalletVo.chainName;
        wallet.chainId = chainId;
        localStorage.setItem('opencean_link_obj', JSON.stringify(reqConnectWalletVo));
        return wallet;
    };
    ConnectWallet.link = function (reqConnectWalletVo) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, chain, chainId, _a, e_1, message, _b, currentProvider, utilsSkd, params, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        wallet = Wallets_1.wallets.walletObj[reqConnectWalletVo.walletName];
                        chain = Chains_1.chains.chainObj[reqConnectWalletVo.chainName];
                        chainId = chain.chainId;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 18]);
                        if (!chainId) return [3 /*break*/, 3];
                        return [4 /*yield*/, wallet.requestConnect(chainId)];
                    case 2:
                        _a = _c.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, wallet.requestConnect()];
                    case 4:
                        _a = _c.sent();
                        _c.label = 5;
                    case 5:
                        _a;
                        return [2 /*return*/, {
                                code: 200,
                                wallet: this.setWallet(__assign({}, wallet), reqConnectWalletVo, chainId)
                            }];
                    case 6:
                        e_1 = _c.sent();
                        message = e_1.message;
                        _b = wallet.sdk || {}, currentProvider = _b.currentProvider, utilsSkd = _b.utils;
                        if (!(message === "40006" && currentProvider)) return [3 /*break*/, 16];
                        params = Chains_1.chains.ethereumChainParams[reqConnectWalletVo.chainName];
                        if (!params) return [3 /*break*/, 9];
                        return [4 /*yield*/, currentProvider.request({
                                method: "wallet_addEthereumChain",
                                params: params
                            })];
                    case 7:
                        _c.sent();
                        return [4 /*yield*/, utils_1.utils.sleep(1500)];
                    case 8:
                        _c.sent();
                        if (utilsSkd.toHex(chainId) == wallet.sdk.currentProvider.chainId) {
                            return [2 /*return*/, {
                                    code: 200,
                                    wallet: this.setWallet(__assign({}, wallet), reqConnectWalletVo, chainId)
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    code: 401,
                                    message: 'User rejected the request.'
                                }];
                        }
                        return [3 /*break*/, 15];
                    case 9:
                        if (!(chainId == '1' || chainId == '3' || chainId == '4')) return [3 /*break*/, 14];
                        _c.label = 10;
                    case 10:
                        _c.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, currentProvider.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{
                                        chainId: utilsSkd.toHex(chainId)
                                    }],
                            })];
                    case 11:
                        _c.sent();
                        return [2 /*return*/, {
                                code: 200,
                                wallet: this.setWallet(__assign({}, wallet), reqConnectWalletVo, chainId)
                            }];
                    case 12:
                        error_1 = _c.sent();
                        return [2 /*return*/, {
                                code: 401,
                                message: error_1.message
                            }];
                    case 13: return [3 /*break*/, 15];
                    case 14: return [2 /*return*/, {
                            code: 500,
                            message: 'Network error'
                        }];
                    case 15: return [3 /*break*/, 17];
                    case 16: return [2 /*return*/, {
                            code: 500,
                            message: /^\d+$/.test(message) ? "wallet_message_" + message : message
                        }];
                    case 17: return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    return ConnectWallet;
}());
exports.ConnectWallet = ConnectWallet;
