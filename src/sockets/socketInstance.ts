import http from "http";
import { SocketManager } from "./socketManager";

export let socketManagerServer: SocketManager;

export function initSocket(server: http.Server) {
  socketManagerServer = new SocketManager(server);
}