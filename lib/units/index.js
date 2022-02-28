"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.units = exports.Units = void 0;
var Units = /** @class */ (function () {
    function Units() {
    }
    Units.prototype.sleep = function (interval) {
        return new Promise(function (resolve) {
            setTimeout(resolve, interval);
        });
    };
    return Units;
}());
exports.Units = Units;
exports.units = new Units();
