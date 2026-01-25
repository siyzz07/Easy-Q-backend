import ContractController from "../controllers/contract/contract-controller";
import ContractService from "../services/common-services/contract-service";
import { addressRepository, contractRepository } from "./repositoriesDi";

const contractServiceInstance = new ContractService(contractRepository,addressRepository);
const contractControllerInstance = new ContractController(contractServiceInstance);

export {
    contractControllerInstance,
    contractServiceInstance
};
