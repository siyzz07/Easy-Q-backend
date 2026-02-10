import ContractController from "../controllers/contract/contract-controller";
import ContractService from "../services/common-services/contract-service";
// import { chatRoomServiceInstance } from "./chatDi";
import { notificationServiceInstance } from "./notificationDi";
// import { notificationServiceInstance } from "./commonDi";
import { addressRepository, contractRepository, vendorRepository } from "./repositoriesDi";

const contractServiceInstance = new ContractService(contractRepository,addressRepository,vendorRepository);
setTimeout(() => {
    contractServiceInstance.setNotificationService(notificationServiceInstance);
}, 0);

const contractControllerInstance = new ContractController(contractServiceInstance);

export {
    contractControllerInstance,
    contractServiceInstance
};
