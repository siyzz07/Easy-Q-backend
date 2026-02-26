


import dotenv  from 'dotenv'
dotenv.config({debug:false})
import http from 'http'
import app from "./app";
import dbConfig from "./config/dbConfig";
import { initSocket } from './sockets/socketInstance';

dbConfig();

const server = http.createServer(app);

const PORT: string = process.env.PORT || "7004";

initSocket(server)


server.listen(Number(process.env.PORT), "0.0.0.0", () => {
  console.log(`HTTP + Socket.IO Server running on port ${process.env.PORT}`);
});
