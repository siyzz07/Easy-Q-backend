
import { AuthController } from "../controllers/auth/auth-controller";
import { AdminRepository } from "../repositories/adminRepository";
import { CustomerRepository } from "../repositories/customerRepository";
import { VendorRepository } from "../repositories/vendorRepository";
import { AuthService } from "../services/auth-services.ts/auth-services";



const vendorRepositoryInstance = new VendorRepository()
const customerRepositoryInstance = new CustomerRepository()
const adminRepositoryInstance = new AdminRepository()



const authSerivceInstance = new AuthService(vendorRepositoryInstance,customerRepositoryInstance,adminRepositoryInstance)
const authControllerInstance = new AuthController(authSerivceInstance)


export {authControllerInstance}