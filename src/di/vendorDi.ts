import { StaffController } from "../controllers/vendorController/staffController";
import { AuthController } from "../controllers/vendorController/authController";
import VendorShopController from "../controllers/vendorController/shopController";
import { StaffRepository } from "../repositories/staffsRepository";
import { VendorRepository } from "../repositories/vendorRepository";
import { StaffService } from "../services/venderServices/staffService";
import { VendorAuthService } from "../services/venderServices/authService";
import VendorShopService from "../services/venderServices/shopService";
import { ServiceRepository } from "../repositories/serviceRepository";
import { VendorServiceService } from "../services/venderServices/serviceService";
import { VendorServiceController } from "../controllers/vendorController/serviceController";


/**
 *  
 */
//----------------------------------------------------------- vendor auth
const vendorRepositoryInstance = new VendorRepository()
const vendorAuthServiceInstance = new VendorAuthService(vendorRepositoryInstance)
const vendorAuthControllerInstance = new AuthController(vendorAuthServiceInstance)
/**
 *  
 */
//----------------------------------------------------------- vendor shop like get shop dat updatad data etc...
const vendorShopServiceInstance = new VendorShopService(vendorRepositoryInstance)
const vendorShopControllerInstance = new VendorShopController(vendorShopServiceInstance)
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
    vendorAuthControllerInstance,
    vendorShopControllerInstance,
    staffControllerInstance,
    vendorServiceControllerInstance
}