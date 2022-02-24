"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swap = void 0;
var index_1 = __importDefault(require("../config/index"));
var Swap = /** @class */ (function () {
    function Swap(dexs) {
        this.dexs = dexs;
    }
    Swap.prototype.findToken = function (symbol, address) {
        var configObj = index_1.default;
        var result = configObj[this.chainName].tokens[symbol];
        if (!result && address) {
            for (var symbol_1 in configObj[this.chainName].tokens) {
                var token = configObj[this.chainName].tokens[symbol_1];
                if (token.address == address) {
                    result = token;
                    break;
                }
            }
        }
        return result;
    };
    return Swap;
}());
exports.Swap = Swap;
