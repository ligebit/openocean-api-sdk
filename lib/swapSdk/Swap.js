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
exports.Swap = exports.ReqSwapVo = void 0;
var api_1 = require("../api");
var RequestVo_1 = require("../api/vo/RequestVo");
Object.defineProperty(exports, "ReqSwapVo", { enumerable: true, get: function () { return RequestVo_1.ReqSwapVo; } });
var Chains_1 = require("../config/Chains");
var Swap = /** @class */ (function () {
    function Swap(option) {
        this.errorCallback = function () { };
        this.transactionHashCallback = function () { };
        this.receiptCallback = function () { };
        this.successCallback = function () { };
        this.option = option;
    }
    Swap.prototype.send = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.target = target;
                        return [4 /*yield*/, api_1.api.swap(this.option)];
                    case 1:
                        data = _a.sent();
                        if (data.code != 200) {
                            this.errorCallback(data.error);
                            return [2 /*return*/, this];
                        }
                        this.res = data.data;
                        this.sendEthTransaction();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Swap.prototype.sendEthTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inToken, inAmount, data, to, from, estimatedGas, swapParams, estimatedGasParams, _b, e_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.res, inToken = _a.inToken, inAmount = _a.inAmount, data = _a.data, to = _a.to, from = _a.from;
                        estimatedGas = this.res.estimatedGas === undefined ? 0 : this.res.estimatedGas;
                        swapParams = {
                            from: from,
                            gas: +estimatedGas,
                        };
                        swapParams.to = to;
                        swapParams.data = data;
                        estimatedGasParams = {
                            from: from,
                        };
                        estimatedGasParams.to = to;
                        estimatedGasParams.data = data;
                        if (Chains_1.chains.isNativeToken(this.target.chainName, inToken.address)) {
                            swapParams.value = inAmount;
                            estimatedGasParams.value = inAmount;
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _b = swapParams;
                        return [4 /*yield*/, this.target.sdk.eth.estimateGas(estimatedGasParams)];
                    case 2:
                        _b.gas = _c.sent();
                        swapParams.gas = Math.ceil(swapParams.gas * 1.15);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        console.log("estimateGas Error", e_1);
                        this.errorCallback('Unable to estimate gas, which may cause transaction failure');
                        return [2 /*return*/];
                    case 4:
                        // swapParams.gas = Math.floor(+swapParams.gas > +estimatedGas ? +swapParams.gas : +estimatedGas * 2);
                        // swapParams.gas = swapParams.gas ? swapParams.gas : +estimatedGas * 1.5;
                        this.target.sdk.eth.sendTransaction(swapParams)
                            .on('error', function (error) {
                            _this.errorCallback(error);
                        })
                            .on('transactionHash', function (transactionHash) {
                            _this.transactionHashCallback(transactionHash);
                        })
                            .on('receipt', function (receipt) {
                            _this.receiptCallback(receipt);
                            // this.getSuccess()
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Swap.prototype.on = function (events, callback) {
        if (events === 'error') {
            this.errorCallback = callback;
        }
        else if (events === 'transactionHash') {
            this.transactionHashCallback = callback;
        }
        else if (events === 'receipt') {
            this.receiptCallback = callback;
        }
        else if (events === 'success') {
            this.successCallback = callback;
        }
        return this;
    };
    return Swap;
}());
exports.Swap = Swap;
