"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotoMobile = void 0;
var QRCode = require("./qrcode").QRCode;
// import { QRCode } from "./qrcode";
var NotoMobile = /** @class */ (function () {
    function NotoMobile(qrData) {
        var id = qrData.id, qrCode = qrData.qrCode;
        this.id = id;
        this.qrCode = qrCode;
        this.show();
    }
    NotoMobile.prototype.$on = function (key, callBack) {
        if (key == 'error')
            this.error = callBack;
    };
    NotoMobile.prototype.show = function () {
        var _this = this;
        // 获取整个页面的宽和高
        var page_width = document.documentElement.scrollWidth;
        var page_height = document.documentElement.scrollHeight;
        // 获取浏览器的宽和高
        var b_width = document.documentElement.clientWidth;
        var b_height = document.documentElement.clientHeight;
        var width = b_width;
        if (width > b_height)
            width = b_height;
        // width = width * 0.9
        var mask = document.createElement("div");
        mask.id = "mask";
        mask.style.width = page_width + "px";
        mask.style.height = page_height + "px";
        mask.style.position = 'absolute';
        mask.style.background = 'rgba(37,41,46,.95)';
        mask.style.zIndex = '999';
        mask.style.top = '0';
        mask.style.left = '0';
        document.body.appendChild(mask);
        var qrcodeBox = document.createElement("div");
        qrcodeBox.id = "qrcodeBox";
        qrcodeBox.style.left = (b_width - width) / 2 + "px";
        qrcodeBox.style.top = (b_height - width) / 2 + "px";
        // qrcodeBox.style.width = '300px'
        // qrcodeBox.style.height = '300px'
        // qrcodeBox.style.background = '#ffffff'
        qrcodeBox.style.position = 'absolute';
        qrcodeBox.style.zIndex = '10000';
        qrcodeBox.style.padding = '0 30px 0 30px';
        qrcodeBox.innerHTML =
            "<div style=\"font-size: 22px;\">\n        <div style=\"color:#ffffff;line-height: 60px;\">Onto Mobile</div>\n        <div id =\"close\" style=\"\"></div>\n        <div id=\"qrcodeb\" style=\"background:#fff;text-align: center;\">\n          <div style=\"color:rgba(60,66,82,.6);line-height: 80px;\">Scan QR code with a Onto wallet</div>\n          <div id=\"qrcode\"></div>\n        </div>\n      </div>\n      ";
        document.body.appendChild(qrcodeBox);
        var qrcodeb = document.getElementById("qrcodeb");
        qrcodeb.style.width = (width - 100) + 'px';
        qrcodeb.style.height = (width - 70) + 'px';
        qrcodeb.style.padding = "0 50px 0 50px";
        qrcodeb.style.borderRadius = "20px";
        qrcodeb.style.boxSizing = 'border-box';
        setTimeout(function () {
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: _this.qrCode,
                width: width - 90 - 100,
                height: width - 90 - 100,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }, 1000);
        //        close做一个点击事件,关闭mask 和 qrcodeBox
        var close = window.document.getElementById("close");
        close.onclick = function () {
            document.body.removeChild(mask);
            document.body.removeChild(qrcodeBox);
        };
        mask.onclick = function () {
            document.body.removeChild(mask);
            document.body.removeChild(qrcodeBox);
        };
    };
    return NotoMobile;
}());
exports.NotoMobile = NotoMobile;
// <!DOCTYPE html>
// <html>
//     <head>
//         <meta charset="UTF-8">
//         <title></title>
//         <style type="text/css">
//             *{
//                 margin: 0px;
//                 padding: 0px;
//             }
//             #mask{
// background-color: black;
// opacity: 0.3;
// position: absolute;
// top: 0px;
// left: 0px;
// z-index: 10;
//             }
//             #qrcodeBox{
//                 width: 400px;
//                 height: 300px;
//                 background-color: blueviolet;
//                 position: absolute;
//                 z-index: 888;
//                 left: 200px;
//                 top: 250px;
//             }
//             #close{
//                 width: 50px;
//                 height: 50px;
//                 background-color: red;
//                 position: absolute;
//                 top: 5px;
//                 right: 5px;
//                 z-index: 999;
//             }
//             #close:hover{
//                 cursor: pointer;
//             }
//         </style>
//     </head>
