import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import logger from "../utils/logger";
let io:SocketIOServer

export const initSocket = (server: HttpServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  logger.info('socket connected')
  return io
};


export const  getIo = () =>{
     if(!io){
        logger.error('Socket.io not initialized')
        return 
     }
     return io
}

