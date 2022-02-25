"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqTokenInfoVo = exports.ReqTokenPriceVo = exports.ReqAllowanceVo = exports.ReqBanlanceVo = exports.ReqBase = void 0;
require("reflect-metadata");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var ChainIds = ['1', '56', '100', '137', '250', '42161', '43114'];
var ReqBase = /** @class */ (function () {
    function ReqBase() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'ChainId addresses cannot be empty' }),
        (0, class_validator_1.IsIn)(ChainIds, { message: 'Chain id in(1/56/100/137/250/42161/43114)' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqBase.prototype, "chainId", void 0);
    return ReqBase;
}());
exports.ReqBase = ReqBase;
var ReqBanlanceVo = /** @class */ (function (_super) {
    __extends(ReqBanlanceVo, _super);
    function ReqBanlanceVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Account cannot be empty' }),
        (0, class_validator_1.Length)(30, 60, { message: 'Account length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqBanlanceVo.prototype, "account", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Token addresses cannot be empty' }),
        (0, class_validator_1.MinLength)(30, { message: 'Token addresses length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqBanlanceVo.prototype, "inTokenAddress", void 0);
    return ReqBanlanceVo;
}(ReqBase));
exports.ReqBanlanceVo = ReqBanlanceVo;
var ReqAllowanceVo = /** @class */ (function (_super) {
    __extends(ReqAllowanceVo, _super);
    function ReqAllowanceVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Account cannot be empty' }),
        (0, class_validator_1.Length)(30, 60, { message: 'Account length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqAllowanceVo.prototype, "account", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Token addresses cannot be empty' }),
        (0, class_validator_1.MinLength)(30, { message: 'Token addresses length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqAllowanceVo.prototype, "inTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Contract addresses cannot be empty' }),
        (0, class_validator_1.MinLength)(30, { message: 'Contract addresses length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqAllowanceVo.prototype, "contractAddress", void 0);
    return ReqAllowanceVo;
}(ReqBase));
exports.ReqAllowanceVo = ReqAllowanceVo;
var ReqTokenPriceVo = /** @class */ (function () {
    function ReqTokenPriceVo() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'ChainId cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTokenPriceVo.prototype, "ids", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Token name cannot be empty' }),
        (0, class_validator_1.Length)(2, 4, { message: 'Token name length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTokenPriceVo.prototype, "vs_currencies", void 0);
    return ReqTokenPriceVo;
}());
exports.ReqTokenPriceVo = ReqTokenPriceVo;
var ReqTokenInfoVo = /** @class */ (function () {
    function ReqTokenInfoVo() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'ChainId cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTokenInfoVo.prototype, "id", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Contract address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTokenInfoVo.prototype, "contract_address", void 0);
    return ReqTokenInfoVo;
}());
exports.ReqTokenInfoVo = ReqTokenInfoVo;
