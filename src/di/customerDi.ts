import { CustomerAddressContorller } from "../controllers/address/address-controller";
import { CustomerController } from "../controllers/customer/customer-controller";
import { CustomerAddresRepository } from "../repositories/customerAddressRepository";;
import { CustomerRepository } from "../repositories/customerRepository";
import { CustomerAddressService } from "../services/customer-services/address-service";
import { CustomerService } from "../services/customer-services/customer-service";


const customerRepositoryInstance = new CustomerRepository()





const customerServiceInstance = new CustomerService(customerRepositoryInstance)
const customerControllerInstance = new CustomerController(customerServiceInstance)


const addressRepositoryInstance = new CustomerAddresRepository()
const AddressServiceInstance = new CustomerAddressService(addressRepositoryInstance)
const AddressControllerInstance = new CustomerAddressContorller(AddressServiceInstance)





export {customerControllerInstance,AddressControllerInstance}
