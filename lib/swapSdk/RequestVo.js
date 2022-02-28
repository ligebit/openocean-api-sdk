"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqConnectWalletVo = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var Wallets_1 = require("../config/Wallets");
var Chains_1 = require("../config/Chains");
var ReqConnectWalletVo = /** @class */ (function () {
    function ReqConnectWalletVo() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Chain name cannot be empty' }),
        (0, class_validator_1.IsEnum)(Chains_1.ChainNames, { message: 'Chain name error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqConnectWalletVo.prototype, "chainName", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Wallet name cannot be empty' }),
        (0, class_validator_1.IsEnum)(Wallets_1.WalletNames, { message: 'Wallet name error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqConnectWalletVo.prototype, "walletName", void 0);
    return ReqConnectWalletVo;
}());
exports.ReqConnectWalletVo = ReqConnectWalletVo;
