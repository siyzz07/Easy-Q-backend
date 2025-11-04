import { StaffRepository } from "../repositories/staffsRepository";
import { VendorRepository } from "../repositories/vendorRepository";
import { StaffService } from "../services/vender-services/staff-service";
import VendorService from "../services/vender-services/vendor-service";
import { ServiceRepository } from "../repositories/serviceRepository";
import { VendorServiceService } from "../services/vender-services/service-service";
import { StaffController } from "../controllers/staff/staff-controller";
import { VendorServiceController } from "../controllers/service/service-controller";
import VendorController from "../controllers/vendor/vendor-controller";
import { ServiceTypes } from "../repositories/ServiceTypesRepository";


/**
 *  
 */
//----------------------------------------------------------- vendor auth
const vendorRepositoryInstance = new VendorRepository()
const staffRepositoryInstance = new StaffRepository()
const serviceTypesRepositoryInstance = new ServiceTypes()
const serviceRepositoryInstance = new ServiceRepository()
/**
 *  
 */
//----------------------------------------------------------- vendor shop like get shop dat updatad data etc...
const vendorShopServiceInstance = new VendorService(vendorRepositoryInstance,staffRepositoryInstance,serviceTypesRepositoryInstance,serviceRepositoryInstance)
const vendorControllerInstance = new VendorController(vendorShopServiceInstance)
/**
 * 
 */
//----------------------------------------------------------- staff
const staffReopositoryInstance = new StaffRepository()
const staffServiceInstance = new StaffService(staffReopositoryInstance)
const staffControllerInstance = new StaffController(staffServiceInstance)
/**
 * 
 */
//------------------------------------------------------------ Service
const vendorServiceRepositoryInstance = new ServiceRepository()
const vendorServiceServiceInstance = new VendorServiceService(vendorServiceRepositoryInstance)
const vendorServiceControllerInstance = new VendorServiceController(vendorServiceServiceInstance)




export {
    vendorControllerInstance,
    staffControllerInstance,
    vendorServiceControllerInstance
}