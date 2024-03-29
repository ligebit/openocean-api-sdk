"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqBase = void 0;
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
