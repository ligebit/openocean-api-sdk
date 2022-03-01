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
exports.ReqtransferVo = exports.ReqTransactionVo = exports.ReqTransactionReceiptVo = exports.ReqSwapVo = exports.ReqQuoteVo = exports.ReqTokenInfoVo = exports.ReqTokenPriceVo = exports.ReqAllowanceVo = exports.ReqBanlanceVo = exports.ReqBase = void 0;
require("reflect-metadata");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var ChainIds = ['1', '3', '4', '56', '100', '137', '250', '42161', '43114'];
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
var ExChanges;
(function (ExChanges) {
    ExChanges[ExChanges["openoceanv1"] = 0] = "openoceanv1";
    ExChanges[ExChanges["openoceanv2"] = 1] = "openoceanv2";
    ExChanges[ExChanges["1inch"] = 2] = "1inch";
    ExChanges[ExChanges["matcha"] = 3] = "matcha";
    ExChanges[ExChanges["paraswap"] = 4] = "paraswap";
})(ExChanges || (ExChanges = {}));
var ReqQuoteVo = /** @class */ (function (_super) {
    __extends(ReqQuoteVo, _super);
    function ReqQuoteVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'ExChange cannot be empty' }),
        (0, class_validator_1.IsEnum)(ExChanges, { message: 'ExChange in(openoceanv1/openoceanv2/1inch/matcha/paraswap)' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqQuoteVo.prototype, "exChange", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'In Token address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqQuoteVo.prototype, "inTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Out Token address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqQuoteVo.prototype, "outTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Amount cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqQuoteVo.prototype, "amount", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'GasPrice cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqQuoteVo.prototype, "gasPrice", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Slippage cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqQuoteVo.prototype, "slippage", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqQuoteVo.prototype, "in_token_decimals", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqQuoteVo.prototype, "out_token_decimals", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqQuoteVo.prototype, "withRoute", void 0);
    return ReqQuoteVo;
}(ReqBase));
exports.ReqQuoteVo = ReqQuoteVo;
var ReqSwapVo = /** @class */ (function (_super) {
    __extends(ReqSwapVo, _super);
    function ReqSwapVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'ExChange cannot be empty' }),
        (0, class_validator_1.IsEnum)(ExChanges, { message: 'ExChange in(openoceanv1/openoceanv2/1inch/matcha/paraswap)' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqSwapVo.prototype, "exChange", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'In Token address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqSwapVo.prototype, "inTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Out Token address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqSwapVo.prototype, "outTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Amount cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqSwapVo.prototype, "amount", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'GasPrice cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqSwapVo.prototype, "gasPrice", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Slippage cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqSwapVo.prototype, "slippage", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'String cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqSwapVo.prototype, "account", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqSwapVo.prototype, "referrer", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqSwapVo.prototype, "in_token_decimals", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqSwapVo.prototype, "out_token_decimals", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return Boolean; })
    ], ReqSwapVo.prototype, "withoutCheckBalance", void 0);
    return ReqSwapVo;
}(ReqBase));
exports.ReqSwapVo = ReqSwapVo;
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["transfer"] = 0] = "transfer";
    TransactionType[TransactionType["swap"] = 1] = "swap";
})(TransactionType || (TransactionType = {}));
var ReqTransactionReceiptVo = /** @class */ (function (_super) {
    __extends(ReqTransactionReceiptVo, _super);
    function ReqTransactionReceiptVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'ExChange cannot be empty' }),
        (0, class_validator_1.IsEnum)(ExChanges, { message: 'ExChange id in(openoceanv1/openoceanv2/1inch/matcha/paraswap)' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTransactionReceiptVo.prototype, "exChange", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Hash cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTransactionReceiptVo.prototype, "hash", void 0);
    return ReqTransactionReceiptVo;
}(ReqBase));
exports.ReqTransactionReceiptVo = ReqTransactionReceiptVo;
var ReqTransactionVo = /** @class */ (function (_super) {
    __extends(ReqTransactionVo, _super);
    function ReqTransactionVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Type cannot be empty' }),
        (0, class_validator_1.IsEnum)(TransactionType, { message: "Type in (transfer/swap)" }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTransactionVo.prototype, "type", void 0);
    return ReqTransactionVo;
}(ReqTransactionReceiptVo));
exports.ReqTransactionVo = ReqTransactionVo;
var ReqtransferVo = /** @class */ (function (_super) {
    __extends(ReqtransferVo, _super);
    function ReqtransferVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'In Token address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqtransferVo.prototype, "inTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Decimals cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqtransferVo.prototype, "decimals", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Amount cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqtransferVo.prototype, "amount", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'GasPrice cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqtransferVo.prototype, "gasPrice", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'TargetAddress cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqtransferVo.prototype, "targetAddress", void 0);
    return ReqtransferVo;
}(ReqBase));
exports.ReqtransferVo = ReqtransferVo;
