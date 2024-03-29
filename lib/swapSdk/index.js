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
exports.SwapSdk = void 0;
var RequestVo_1 = require("./RequestVo");
var ajx_1 = require("../utils/ajx");
var utils_1 = require("../utils");
var ConnectWallet_1 = require("./ConnectWallet");
var Approve_1 = require("./Approve");
var config_1 = require("../config");
var Swap_1 = require("./Swap");
var api_1 = require("../api");
var SwapSdk = /** @class */ (function () {
    function SwapSdk() {
        this.i = 0;
        var data = localStorage.getItem('opencean_link_obj');
        if (data) {
            this.connectWallet(JSON.parse(data));
        }
    }
    SwapSdk.prototype.swapQuote = function (reqSwapVo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.wallet) {
                            return [2 /*return*/, {
                                    code: 400,
                                    message: 'No linked wallet'
                                }];
                        }
                        if (this.wallet && this.chain.key != reqSwapVo.chain) {
                            return [2 /*return*/, {
                                    code: 400,
                                    message: 'Chain error'
                                }];
                        }
                        return [4 /*yield*/, api_1.api.swapQuote(reqSwapVo)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SwapSdk.prototype.swap = function (swapData) {
        return new Swap_1.Swap(swapData, this.wallet, this.chain);
    };
    SwapSdk.prototype.approve = function (reqApproveVo) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, contract, approve;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.wallet) {
                            return [2 /*return*/, {
                                    code: 400,
                                    message: 'No linked wallet'
                                }];
                        }
                        if (this.wallet && this.wallet.chain != reqApproveVo.chain) {
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
                        contract = new this.wallet.sdk.eth.Contract(reqApproveVo.tokenAbi, reqApproveVo.tokenAddress);
                        if (!contract || !contract.methods || !contract.methods.approve) {
                            return [2 /*return*/, {
                                    code: 400,
                                    message: 'Contract error'
                                }];
                        }
                        approve = new Approve_1.Approve(contract);
                        approve.send(reqApproveVo, this.wallet.address);
                        return [2 /*return*/, approve];
                }
            });
        });
    };
    SwapSdk.prototype.connectWallet = function (reqConnectWalletVo) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.wallet && this.wallet.key == reqConnectWalletVo.walletName && this.wallet.chainName == reqConnectWalletVo.chain) {
                            return [2 /*return*/, {
                                    code: 200,
                                    sdk: {
                                        wallet: this.wallet,
                                        chain: this.chain
                                    }
                                }];
                        }
                        return [4 /*yield*/, (0, ajx_1.validateReq)(reqConnectWalletVo, RequestVo_1.ReqConnectWalletVo)];
                    case 1:
                        errors = _a.sent();
                        if (!errors) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                code: 400,
                                message: errors
                            }];
                    case 2: return [4 /*yield*/, ConnectWallet_1.ConnectWallet.link(reqConnectWalletVo)];
                    case 3:
                        data = _a.sent();
                        if (data.code == 200) {
                            this.wallet = data.sdk.wallet;
                            this.chain = data.sdk.chain;
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    SwapSdk.prototype.getWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.wallet)
                            return [2 /*return*/, this.wallet];
                        return [4 /*yield*/, utils_1.utils.sleep(1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getWallet()];
                }
            });
        });
    };
    SwapSdk.prototype.getChain = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.chain)
                            return [2 /*return*/, this.chain];
                        return [4 /*yield*/, utils_1.utils.sleep(1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getChain()];
                }
            });
        });
    };
    return SwapSdk;
}());
exports.SwapSdk = SwapSdk;
