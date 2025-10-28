
import { AdminController } from "../controllers/adminController/adminController";
import { AdminAtuhController } from "../controllers/adminController/authController";
import { ServiceTypeController } from "../controllers/adminController/serviceTypeController";
import { AdminRepository } from "../repositories/adminRepository";
import { ServiceTypes } from "../repositories/ServiceTypesRepository";

import { AdminService } from "../services/adminServices/adminService";
import { AuthService } from "../services/adminServices/atuhService";
import { ServiceTypesService } from "../services/adminServices/sverviceTypesVendorService";





//---------------------------------------------------------------- admin auth 
const adminRepositoryInstace = new AdminRepository()
const adminServiceInstance = new AuthService(adminRepositoryInstace)
const adminControllerInstance = new AdminAtuhController(adminServiceInstance)



//---------------------------------------------------------------- admin serice liek get vendors get customer updata and etc..
const adminService = new AdminService(adminRepositoryInstace)
const adminController = new AdminController(adminService)



//---------------------------------------------------------------- service types for vendor 
const serviceTypesRepositoryInstace = new ServiceTypes()
const serviceTypesServiceInstance = new ServiceTypesService(serviceTypesRepositoryInstace)
const serviceTypesControllerInstence = new ServiceTypeController(serviceTypesServiceInstance)






export {adminControllerInstance,adminController,serviceTypesControllerInstence}