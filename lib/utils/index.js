"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.Utils = void 0;
var web3_1 = require("../utils/web3");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.sleep = function (interval) {
        return new Promise(function (resolve) {
            setTimeout(resolve, interval);
        });
    };
    Utils.prototype.parseDecimals = function (sum, decimals) {
        return web3_1.web3.utils.toBN(sum).div(web3_1.web3.utils.toBN(Math.pow(10, decimals))).toNumber();
    };
    Utils.prototype.formatDecimals = function (sum, decimals) {
        return web3_1.web3.utils.toBN(sum).mul(web3_1.web3.utils.toBN(Math.pow(10, decimals))).toNumber();
    };
    return Utils;
}());
exports.Utils = Utils;
exports.utils = new Utils();
