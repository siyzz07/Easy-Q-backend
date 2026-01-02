"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
const socket_io_1 = require("socket.io");
const socketAuth_1 = require("../middlewares/socketAuth");
class SocketManager {
    constructor(server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: [process.env.BASE_URL],
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                credentials: true,
            },
        });
        this.registerCoreEvents();
    }
    registerCoreEvents() {
        this.io.use(socketAuth_1.socketAuth);
        this.io.on("connection", (socket) => {
            const userId = socket.data.userId;
            socket.join(userId);
            console.log(`Client connected: ${socket.id}`);
            console.log("UserId:", socket.data.userId);
            // new ChatEvents(socket, this.io).register();
            // new NotificationEvents(socket, this.io).register();
        });
        console.log("Socket Server initialized");
    }
    getIo() {
        return this.io;
    }
}
exports.SocketManager = SocketManager;
