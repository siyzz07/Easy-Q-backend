import CustomerAuth from "../controllers/customerController/authController";
import { CustomerRepository } from "../repositories/customerRepository";
import AuthService from "../services/customerServices/authService";


const customerRepositoryInstance = new CustomerRepository()
const customerAuthServiceInstance = new AuthService(customerRepositoryInstance)
const  authContollerInstance = new CustomerAuth(customerAuthServiceInstance)


export {authContollerInstance}
