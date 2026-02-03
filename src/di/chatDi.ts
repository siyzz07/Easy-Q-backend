import { ChatRoomController } from "../controllers/chat/chatRoom-controller";
import { ChatRoomService } from "../services/common-services/chatRoomService";
import { chatRoomRepository } from "./repositoriesDi";



const chatRoomServiceInstance  = new ChatRoomService(chatRoomRepository)
const chatRoomControllerInstance = new ChatRoomController(chatRoomServiceInstance)


export{ chatRoomServiceInstance,chatRoomControllerInstance}