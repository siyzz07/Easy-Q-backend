"use strict";
// import dotenv  from 'dotenv'
// dotenv.config({debug:false})
// import http from 'http'
// import app from "./app";
// import dbConfig from "./config/dbConfig";
// import { SocketManager } from './sockets/socketManager';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const server = http.createServer(app)
// const PORT:string = process.env.PORT||"7000"
// new SocketManager(server)
// dbConfig()
// app.listen(PORT,()=>{
//     console.log(`Server running or port ${PORT} ` );
// })
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ debug: false });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const socketInstance_1 = require("./sockets/socketInstance");
(0, dbConfig_1.default)();
const server = http_1.default.createServer(app_1.default);
const PORT = process.env.PORT || "7001";
(0, socketInstance_1.initSocket)(server);
server.listen(PORT, () => {
    console.log(`HTTP + Socket.IO Server running on port ${PORT}`);
});
