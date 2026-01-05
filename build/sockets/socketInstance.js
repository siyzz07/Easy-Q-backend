"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketManagerServer = void 0;
exports.initSocket = initSocket;
const socketManager_1 = require("./socketManager");
function initSocket(server) {
    exports.socketManagerServer = new socketManager_1.SocketManager(server);
}
