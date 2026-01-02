import { AuthController } from "../controllers/auth/auth-controller";
import { AuthService } from "../services/auth-services.ts/auth-services";
import { 
    adminRepository, 
    customerRepository, 
    vendorRepository 
} from "./repositoriesDi";

const authSerivceInstance = new AuthService(vendorRepository, customerRepository, adminRepository)
const authControllerInstance = new AuthController(authSerivceInstance)

export { authControllerInstance }