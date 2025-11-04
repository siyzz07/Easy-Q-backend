

import { AdminController } from "../controllers/admin/admin-controller";
import { ServiceTypeController } from "../controllers/service-types/service-types-controller";
import { AdminRepository } from "../repositories/adminRepository";
import { CustomerRepository } from "../repositories/customerRepository";
import { ServiceTypes } from "../repositories/ServiceTypesRepository";
import { VendorRepository } from "../repositories/vendorRepository";

import { AdminService } from "../services/admin-services/admin-service";

import { ServiceTypesService } from '../services/admin-services/svervice-types-vendor-service'





const adminRepositoryInstance = new AdminRepository()
const serviceTypesRepositoryInstance = new ServiceTypes()
const customerRepositoryInstance = new CustomerRepository()
const vendorRepositoryInstance = new VendorRepository()



//---------------------------------------------------------------- admin serice liek get vendors get customer updata and etc..
const adminService = new AdminService(adminRepositoryInstance,customerRepositoryInstance,vendorRepositoryInstance)
const adminController = new AdminController(adminService)



//---------------------------------------------------------------- service types for vendor 
const serviceTypesServiceInstance = new ServiceTypesService(serviceTypesRepositoryInstance)
const serviceTypesControllerInstence = new ServiceTypeController(serviceTypesServiceInstance)






export {adminController,serviceTypesControllerInstence}