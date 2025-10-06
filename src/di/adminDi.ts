import { AdminAtuhController } from "../controllers/adminController/authController";
import { AdminRepository } from "../repositories/adminRepository";
import { AuthService } from "../services/adminServices/atuhService";




const adminRepositoryInstace = new AdminRepository()
const adminServiceInstance = new AuthService(adminRepositoryInstace)
const adminControllerInstance = new AdminAtuhController(adminServiceInstance)


export {adminControllerInstance}