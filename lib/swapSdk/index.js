"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SwapSdk = /** @class */ (function () {
    function SwapSdk() {
    }
    SwapSdk.prototype.connectWallet = function (chainId, walletObj) {
        console.log(chainId);
        console.log(walletObj);
    };
    return SwapSdk;
}());
exports.default = SwapSdk;
