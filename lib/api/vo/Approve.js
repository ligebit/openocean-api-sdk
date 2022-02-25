"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Approve = void 0;
require("reflect-metadata");
var Approve = /** @class */ (function () {
    function Approve(params) {
        this.errorCallback = function () { };
        this.transactionHashCallback = function () { };
        this.params = params;
    }
    Approve.prototype.send = function () {
        return this.params.chainId;
    };
    Approve.prototype.on = function (events, callback) {
        if (events === 'error') {
            this.errorCallback = callback;
        }
        else if (events === 'transactionHash') {
            this.transactionHashCallback = callback;
        }
    };
    return Approve;
}());
exports.Approve = Approve;
