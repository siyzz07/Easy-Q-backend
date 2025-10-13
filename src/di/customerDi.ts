import { CustomerAddressContorller } from "../controllers/customerController/addressController";
import CustomerAuth from "../controllers/customerController/authController";
import { CustomerController } from "../controllers/customerController/customerController";
import { CustomerAddresRepository } from "../repositories/AddressRepository";
// import { CustomerAddresRepository } from "../repositories/addressRepository";
import { CustomerRepository } from "../repositories/customerRepository";
import { CustomerAddressService } from "../services/customerServices/addressService";
import AuthService from "../services/customerServices/authService";
import { CustomerService } from "../services/customerServices/customerService";


const customerRepositoryInstance = new CustomerRepository()
const customerAuthServiceInstance = new AuthService(customerRepositoryInstance)
const  authContollerInstance = new CustomerAuth(customerAuthServiceInstance)


const customerServiceInstance = new CustomerService(customerRepositoryInstance)
const customerControllerInstance = new CustomerController(customerServiceInstance)


const addressRepositoryInstance = new CustomerAddresRepository()
const AddressServiceInstance = new CustomerAddressService(addressRepositoryInstance)
const AddressControllerInstance = new CustomerAddressContorller(AddressServiceInstance)





export {authContollerInstance,customerControllerInstance,AddressControllerInstance}
