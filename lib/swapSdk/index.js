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
exports.SwapSdk = void 0;
var RequestVo_1 = require("./RequestVo");
var ajx_1 = require("../utils/ajx");
var utils_1 = require("../utils");
var Wallets_1 = require("../config/Wallets");
var Chains_1 = require("../config/Chains");
var Approve_1 = require("./Approve");
var config_1 = require("../config");
var Swap_1 = require("./Swap");
var SwapSdk = /** @class */ (function () {
    function SwapSdk() {
    }
    SwapSdk.prototype.swap = function (option) {
        var swap = new Swap_1.Swap(option);
        swap.send();
        return swap;
    };
    SwapSdk.prototype.approve = function (reqApproveVo) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, contract, approve;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.target) {
                            return [2 /*return*/, {
                                    code: 400,
                                    message: 'No linked wallet'
                                }];
                        }
                        if (this.target && this.target.chainId != reqApproveVo.chainId) {
                            return [2 /*return*/, {
                                    code: 400,
                                    message: 'Network error'
                                }];
                        }
                        return [4 /*yield*/, (0, ajx_1.validateReq)(reqApproveVo, RequestVo_1.ReqApproveVo)];
                    case 1:
                        errors = _a.sent();
                        if (errors) {
                            return [2 /*return*/, {
                                    code: 400,
                                    message: errors
                                }];
                        }
                        if (!reqApproveVo.tokenAbi)
                            reqApproveVo.tokenAbi = config_1.ERC20_abi;
                        contract = new this.target.sdk.eth.Contract(reqApproveVo.tokenAbi, reqApproveVo.tokenAddress);
                        if (!contract || !contract.methods || !contract.methods.approve) {
                            return [2 /*return*/, {
                                    code: 400,
                                    message: 'Contract error'
                                }];
                        }
                        approve = new Approve_1.Approve(contract);
                        approve.send(reqApproveVo, this.target.address);
                        return [2 /*return*/, approve];
                }
            });
        });
    };
    SwapSdk.prototype.connectWallet = function (reqConnectWalletVo) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, target, chain, chainId, _a, e_1, message, _b, currentProvider, utilsSkd, params, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, ajx_1.validateReq)(reqConnectWalletVo, RequestVo_1.ReqConnectWalletVo)];
                    case 1:
                        errors = _c.sent();
                        if (!errors) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                code: 400,
                                message: errors
                            }];
                    case 2:
                        target = Wallets_1.wallets.walletObj[reqConnectWalletVo.walletName];
                        chain = Chains_1.chains.chainObj[reqConnectWalletVo.chainName];
                        chainId = chain.chainId;
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 8, , 20]);
                        if (!chainId) return [3 /*break*/, 5];
                        return [4 /*yield*/, target.requestConnect(chainId)];
                    case 4:
                        _a = _c.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, target.requestConnect()];
                    case 6:
                        _a = _c.sent();
                        _c.label = 7;
                    case 7:
                        _a;
                        this.target = __assign({}, target);
                        return [2 /*return*/, {
                                code: 200,
                                target: this.target
                            }];
                    case 8:
                        e_1 = _c.sent();
                        message = e_1.message;
                        _b = target.sdk || {}, currentProvider = _b.currentProvider, utilsSkd = _b.utils;
                        if (!(message === "40006" && currentProvider)) return [3 /*break*/, 18];
                        params = Chains_1.chains.ethereumChainParams[chain.key];
                        if (!params) return [3 /*break*/, 11];
                        return [4 /*yield*/, currentProvider.request({
                                method: "wallet_addEthereumChain",
                                params: params
                            })];
                    case 9:
                        _c.sent();
                        return [4 /*yield*/, utils_1.utils.sleep(1500)];
                    case 10:
                        _c.sent();
                        if (utilsSkd.toHex(chainId) == target.sdk.currentProvider.chainId) {
                            target.chainId = chainId;
                            this.target = __assign({}, target);
                            return [2 /*return*/, {
                                    code: 200,
                                    target: this.target
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    code: 401,
                                    message: 'User rejected the request.'
                                }];
                        }
                        return [3 /*break*/, 17];
                    case 11:
                        if (!(chainId == '1' || chainId == '3' || chainId == '4')) return [3 /*break*/, 16];
                        _c.label = 12;
                    case 12:
                        _c.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, currentProvider.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{
                                        chainId: utilsSkd.toHex(chainId)
                                    }],
                            })];
                    case 13:
                        _c.sent();
                        target.chainId = chainId;
                        this.target = __assign({}, target);
                        return [2 /*return*/, {
                                code: 200,
                                target: this.target
                            }];
                    case 14:
                        error_1 = _c.sent();
                        return [2 /*return*/, {
                                code: 401,
                                message: error_1.message
                            }];
                    case 15: return [3 /*break*/, 17];
                    case 16: return [2 /*return*/, {
                            code: 500,
                            message: 'Network error'
                        }];
                    case 17: return [3 /*break*/, 19];
                    case 18: return [2 /*return*/, {
                            code: 500,
                            message: /^\d+$/.test(message) ? "wallet_message_" + message : message
                        }];
                    case 19: return [3 /*break*/, 20];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    return SwapSdk;
}());
exports.SwapSdk = SwapSdk;
