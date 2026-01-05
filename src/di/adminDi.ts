import { AdminController } from "../controllers/admin/admin-controller";
import { ServiceTypeController } from "../controllers/service-types/service-types-controller";
import { AdminService } from "../services/admin-services/admin-service";
import { ServiceTypesService } from '../services/admin-services/svervice-types-vendor-service'
import { 
    adminRepository, 
    customerRepository, 
    serviceTypesRepository, 
    vendorRepository 
} from "./repositoriesDi";

//---------------------------------------------------------------- admin serice liek get vendors get customer updata and etc..
const adminService = new AdminService(adminRepository, customerRepository, vendorRepository)
const adminController = new AdminController(adminService)

//---------------------------------------------------------------- service types for vendor 
const serviceTypesServiceInstance = new ServiceTypesService(serviceTypesRepository)
const serviceTypesControllerInstence = new ServiceTypeController(serviceTypesServiceInstance)

export {
    adminController,
    serviceTypesControllerInstence,
    adminRepository
}