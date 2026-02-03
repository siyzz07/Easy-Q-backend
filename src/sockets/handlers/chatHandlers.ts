import { Socket,Server } from "socket.io";
import { socketAuth } from "../../middlewares/socketAuth";

export type AttachmentType = {
  url: string;
  type: "image";
};

export type MessagePayload = {
  chatRoomId: string;
  sender: string;
  senderRole: "Vendor" | "Customer";
  text?: string;
  attachments?: AttachmentType[];
};


//-------------- join chat room
export const joinRoom = (socket:Socket,roomId:string) =>{
    socket.join(roomId)
}

//------------- handle messagae
export const handleMessage = (io:Server,data:MessagePayload)=>{
  io.to(data.chatRoomId).emit("message:receive",data)

}