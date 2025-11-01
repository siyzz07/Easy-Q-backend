import { CustomerAddressContorller } from "../controllers/customerController/addressController";
import CustomerAuth from "../controllers/customerController/authController";
import { CustomerController } from "../controllers/customerController/customerController";
import { CustomerAddresRepository } from "../repositories/customerAddressRepository";;
import { CustomerRepository } from "../repositories/customerRepository";
import { CustomerAddressService } from "../services/customer-services/address-service";
import AuthService from "../services/customer-services/auth-service";
import { CustomerService } from "../services/customer-services/customer-service";


const customerRepositoryInstance = new CustomerRepository()
const customerAuthServiceInstance = new AuthService(customerRepositoryInstance)
const  authContollerInstance = new CustomerAuth(customerAuthServiceInstance)


const customerServiceInstance = new CustomerService(customerRepositoryInstance)
const customerControllerInstance = new CustomerController(customerServiceInstance)


const addressRepositoryInstance = new CustomerAddresRepository()
const AddressServiceInstance = new CustomerAddressService(addressRepositoryInstance)
const AddressControllerInstance = new CustomerAddressContorller(AddressServiceInstance)





export {authContollerInstance,customerControllerInstance,AddressControllerInstance}
