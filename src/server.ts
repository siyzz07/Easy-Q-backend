


import dotenv  from 'dotenv'
dotenv.config({debug:false})
import http from 'http'
import app from "./app";
import dbConfig from "./config/dbConfig";
import { SocketManager } from './sockets/socketManager';
import { initSocket } from './sockets/socketInstance';

dbConfig();

const server = http.createServer(app);

const PORT: string = process.env.PORT || "7003";

initSocket(server)


server.listen(PORT, () => {
  console.log(`HTTP + Socket.IO Server running on port ${PORT}`);
});

