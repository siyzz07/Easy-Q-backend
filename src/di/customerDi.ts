import CustomerAuth from "../controllers/customerController/authController";
import { CustomerController } from "../controllers/customerController/customerController";
import { CustomerRepository } from "../repositories/customerRepository";
import AuthService from "../services/customerServices/authService";
import { CustomerService } from "../services/customerServices/customerService";


const customerRepositoryInstance = new CustomerRepository()
const customerAuthServiceInstance = new AuthService(customerRepositoryInstance)
const  authContollerInstance = new CustomerAuth(customerAuthServiceInstance)


const customerServiceInstance = new CustomerService(customerRepositoryInstance)
const customerControllerInstance = new CustomerController(customerServiceInstance)

export {authContollerInstance,customerControllerInstance}
