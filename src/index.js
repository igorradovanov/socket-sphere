"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var socket_io_1 = require("socket.io");
var path_1 = require("path");
var url_1 = require("url");
var helmet_1 = require("helmet");
var chatSocket_js_1 = require("./sockets/chatSocket.js");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var env = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 3500;
var app = (0, express_1.default)();
exports.app = app;
if (env != 'development') {
    app.use((0, helmet_1.default)()); // Apply helmet middleware for enhanced security
}
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
var httpServer = app.listen(PORT, function () {
    console.log("Listening on port ".concat(PORT));
});
var io = new socket_io_1.Server(httpServer);
(0, chatSocket_js_1.chatSocket)(io);
