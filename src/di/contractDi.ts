import ContractController from "../controllers/contract/contract-controller";
import ContractService from "../services/common-services/contract-service";
import { chatRoomServiceInstance } from "./chatDi";
import { notificationServiceInstance } from "./commonDi";
import { addressRepository, contractRepository, notificationRepository, vendorRepository } from "./repositoriesDi";

const contractServiceInstance = new ContractService(contractRepository,addressRepository,vendorRepository,notificationServiceInstance,chatRoomServiceInstance);
const contractControllerInstance = new ContractController(contractServiceInstance);

export {
    contractControllerInstance,
    contractServiceInstance
};
