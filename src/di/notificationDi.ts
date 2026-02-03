import { NotificaionController } from "../controllers/notification/notificaion-controller";
import { NotificationService } from "../services/common-services/notification-service";
import { notificationRepository } from "./repositoriesDi";

const notificationServiceInstance = new NotificationService(notificationRepository);
const notificationControllerInstance = new NotificaionController(notificationServiceInstance);

export {
    notificationServiceInstance,
    notificationControllerInstance
};
