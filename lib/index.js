"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenoceanApiSdk = void 0;
var api_1 = require("./api");
var units_1 = require("./units");
var swapSdk_1 = __importDefault(require("./swapSdk"));
var web3_1 = __importDefault(require("web3"));
var web3 = new web3_1.default();
var units = new units_1.Units();
var OpenoceanApiSdk = /** @class */ (function () {
    function OpenoceanApiSdk() {
        this.api = new api_1.Api();
        this.SwapSdk = new swapSdk_1.default();
        this.web3 = web3;
        this.units = units;
    }
    return OpenoceanApiSdk;
}());
exports.OpenoceanApiSdk = OpenoceanApiSdk;
// export OpenoceanApiSdk
