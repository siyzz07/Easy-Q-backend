
import { AdminController } from "../controllers/adminController/adminController";
import { AdminAtuhController } from "../controllers/adminController/authController";
import { AdminRepository } from "../repositories/adminRepository";
import { AdminService } from "../services/adminServices/adminService";
import { AuthService } from "../services/adminServices/atuhService";




const adminRepositoryInstace = new AdminRepository()
const adminServiceInstance = new AuthService(adminRepositoryInstace)
const adminControllerInstance = new AdminAtuhController(adminServiceInstance)



const adminService = new AdminService(adminRepositoryInstace)
const adminController = new AdminController(adminService)

export {adminControllerInstance,adminController}