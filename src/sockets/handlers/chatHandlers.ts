import { Socket,Server } from "socket.io";
import { socketAuth } from "../../middlewares/socketAuth";
import { messageServiceInstance } from "../../di/chatDi";
import mongoose from "mongoose";
import { MessageResponseDTO } from "../../dto/message-dto/message-dto";

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
  time?: string;
};


//-------------- join chat room
export const joinRoom = (socket:Socket,roomId:string) =>{
    socket.join(roomId)
}

//------------- handle messagae
export const handleMessage = async (io:Server,data:MessagePayload)=>{
  try {
    const savedMessage = await messageServiceInstance.saveMessage({
      chatRoomId: new mongoose.Types.ObjectId(data.chatRoomId),
      sender: new mongoose.Types.ObjectId(data.sender),
      senderRole: data.senderRole,
      text: data.text,
      attachments: data.attachments,
    });
    
    const messageToEmit = savedMessage;
    io.to(data.chatRoomId).emit("message:receive", messageToEmit);
  } catch (error) {
    console.error("Error saving message:", error);
  }
}