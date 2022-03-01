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
exports.Approve = void 0;
var Approve = /** @class */ (function () {
    function Approve(contract) {
        this.errorCallback = function () { };
        this.transactionHashCallback = function () { };
        this.receiptCallback = function () { };
        this.successCallback = function () { };
        this.contract = contract;
    }
    Approve.prototype.send = function (reqApproveVo, address) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gasAmount, error_1, json;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.account = address;
                        this.key = 0;
                        this.contractAddress = reqApproveVo.contractAddress;
                        this.tokenAddress = reqApproveVo.tokenAddress;
                        if (!!reqApproveVo.amount) return [3 /*break*/, 2];
                        _a = reqApproveVo;
                        return [4 /*yield*/, this.contract.methods.totalSupply().call()];
                    case 1:
                        _a.amount = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.amount = reqApproveVo.amount + '';
                        gasAmount = '80000';
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.contract.methods
                                .approve(this.contractAddress, this.amount)
                                .estimateGas({
                                from: this.account,
                            })];
                    case 4:
                        gasAmount = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        setTimeout(function () {
                            _this.errorCallback(error_1);
                        }, 500);
                        return [2 /*return*/];
                    case 6:
                        json = {
                            from: address,
                            // gas: gasAmount
                        };
                        if (reqApproveVo.gasPrice) {
                            json.gasPrice = reqApproveVo.gasPrice;
                        }
                        this.contract.methods.approve(this.contractAddress, this.amount)
                            .send(json)
                            .on('error', function (error) {
                            _this.errorCallback(error);
                        })
                            .on('transactionHash', function (transactionHash) {
                            _this.transactionHashCallback(transactionHash);
                        })
                            .on('receipt', function (receipt) {
                            _this.receiptCallback(receipt);
                            _this.getSuccess();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Approve.prototype.on = function (events, callback) {
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
    Approve.prototype.getSuccess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.allowance(this.account, this.contractAddress).call()];
                    case 1:
                        balance = _a.sent();
                        // const decimals = await this.contract.methods.decimals().call()
                        // Number(formatUnits(balance, decimals))
                        this.key++;
                        if (this.key > 20)
                            return [2 /*return*/];
                        if (balance >= this.amount) {
                            this.successCallback(balance);
                        }
                        else {
                            setTimeout(function () {
                                _this.getSuccess();
                            }, 2000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Approve;
}());
exports.Approve = Approve;
