import { ChatRoomController } from "../controllers/chat/chatRoom-controller";
import { ChatRoomService } from "../services/common-services/chatRoomService";
import { chatRoomRepository } from "./repositoriesDi";

import { MessageService } from "../services/common-services/messageService";
import { messageRepository } from "./repositoriesDi";

import { MessageController } from "../controllers/chat/message-controller";
import { contractServiceInstance } from "./contractDi";

const chatRoomServiceInstance: ChatRoomService =  new ChatRoomService(chatRoomRepository, contractServiceInstance);
const chatRoomControllerInstance =  new ChatRoomController(chatRoomServiceInstance);
const messageServiceInstance: MessageService =  new MessageService(messageRepository);
const messageControllerInstance =  new MessageController(messageServiceInstance);

contractServiceInstance.setChatRoomService(chatRoomServiceInstance);

export {
  chatRoomServiceInstance,
  chatRoomControllerInstance,
  messageServiceInstance,
  messageControllerInstance
};
