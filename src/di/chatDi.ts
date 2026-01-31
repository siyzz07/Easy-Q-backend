import { ChatRoomService } from "../services/common-services/chatRoomService";
import { chatRoomRepository } from "./repositoriesDi";



const chatRoomServiceInstance  = new ChatRoomService(chatRoomRepository)



export{ chatRoomServiceInstance}