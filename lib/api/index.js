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
exports.Api = void 0;
// import Web3 from 'web3'
var axios = require('axios');
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var Approve_1 = require("./vo/Approve");
var Balance_1 = require("./vo/Balance");
var Api = /** @class */ (function () {
    function Api() {
        this.URL = 'https://open-api.openocean.finance';
    }
    Api.prototype._validate = function (vo, option) {
        return __awaiter(this, void 0, void 0, function () {
            var reqAllowanceVo, errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqAllowanceVo = (0, class_transformer_1.plainToClass)(vo, option);
                        return [4 /*yield*/, (0, class_validator_1.validate)(reqAllowanceVo)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length) {
                            return [2 /*return*/, errors.reduce(function (o, n) {
                                    Object.keys(n.constraints).forEach(function (key) {
                                        o.push(n.constraints[key]);
                                    });
                                    return o;
                                }, []).join('.')];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype._get = function (url, option, vo) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var errors, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this._validate(vo, option)];
                                case 1:
                                    errors = _a.sent();
                                    if (errors) {
                                        reject({
                                            code: 400,
                                            message: errors
                                        });
                                    }
                                    else {
                                        axios({
                                            method: 'get',
                                            url: "".concat(this.URL).concat(url),
                                            params: option
                                        })
                                            .then(function (response) {
                                            resolve(response.data);
                                        })
                                            .catch(function (error) {
                                            reject(error ? error.message : 'An unknown error');
                                        });
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    reject({
                                        code: 800,
                                        message: error_1 || 'An unknown error'
                                    });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Api.prototype.getBalance = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._get('/v1/cross/getBalance', option, Balance_1.ReqBanlanceVo)];
            });
        });
    };
    Api.prototype.getAllowance = function (option) {
        return this._get('/v1/cross/getAllowance', option, Approve_1.ReqAllowanceVo);
    };
    Api.prototype.approve = function (params) {
        var sd = new Approve_1.Approve(params);
        var b = sd.send();
        setTimeout(function () {
            if (sd.errorCallback)
                sd.errorCallback(b);
        }, 100);
        return sd;
    };
    Api.prototype.quote = function () {
    };
    Api.prototype.swap = function () {
    };
    Api.prototype.getTokenPrice = function () {
    };
    Api.prototype.getTokeninfo = function () {
    };
    return Api;
}());
exports.Api = Api;
