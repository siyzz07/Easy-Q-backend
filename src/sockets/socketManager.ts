import { Server, Socket } from "socket.io";
import http from "http";
import { socketAuth } from '../middlewares/socketAuth';
import logger from "../utils/logger";


export interface ISocketManager {
  getIo(): Server;
}



export class SocketManager implements ISocketManager {
  private io: Server;

  constructor(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      },
    });

    this.registerCoreEvents();
  }

  private registerCoreEvents() {
    this.io.use(socketAuth);

    

    this.io.on("connection", (socket: Socket) => {
      const userId = socket.data.userId
      socket.join(userId)
      console.log(`Client connected: ${socket.id}`);
      console.log("UserId:", socket.data.userId); 

      // new ChatEvents(socket, this.io).register();
      // new NotificationEvents(socket, this.io).register();
    });

    console.log("Socket Server initialized");
  }

  public getIo(): Server {
    return this.io;
  }
}
