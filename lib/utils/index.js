"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.Utils = void 0;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.sleep = function (interval) {
        return new Promise(function (resolve) {
            setTimeout(resolve, interval);
        });
    };
    return Utils;
}());
exports.Utils = Utils;
exports.utils = new Utils();
