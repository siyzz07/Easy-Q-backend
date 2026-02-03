import { Server, Socket } from "socket.io";
import { handleMessage, joinRoom, MessagePayload } from "../handlers/chatHandlers";



export class  ChatEvents {

    private socket :Socket
    private io :Server
    constructor (socket:Socket ,io:Server){
        this.socket =socket
        this.io = io
    }


    public register() {
        this.socket.on('join-room',(id:string)=> {
            joinRoom(this.socket,id)
        })



        this.socket.on('message:new',(data:MessagePayload)=>{
            handleMessage(this.io,data)
        })
    }
   

} 