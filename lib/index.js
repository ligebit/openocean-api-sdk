"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenoceanApiSdk = void 0;
var api_1 = require("./api");
var utils_1 = require("./utils");
var web3_1 = require("./utils/web3");
var swapSdk_1 = require("./swapSdk");
var config_1 = require("./config");
var OpenoceanApiSdk = /** @class */ (function () {
    function OpenoceanApiSdk() {
        this.api = new api_1.Api();
        this.swapSdk = new swapSdk_1.SwapSdk();
        this.web3 = web3_1.web3;
        this.utils = utils_1.utils;
        this.config = config_1.config;
    }
    return OpenoceanApiSdk;
}());
exports.OpenoceanApiSdk = OpenoceanApiSdk;
