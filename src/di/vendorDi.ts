import { StaffController } from "../controllers/staff/staff-controller";
import { VendorServiceController } from "../controllers/service/service-controller";
import VendorController from "../controllers/vendor/vendor-controller";
import { StaffService } from "../services/vender-services/staff-service";
import VendorService from "../services/vender-services/vendor-service";
import { VendorServiceService } from "../services/vender-services/service-service";
import { 
    serviceRepository, 
    serviceTypesRepository, 
    staffRepository, 
    vendorRepository 
} from "./repositoriesDi";

//----------------------------------------------------------- vendor shop like get shop dat updatad data etc...
const vendorShopServiceInstance = new VendorService(vendorRepository, staffRepository, serviceTypesRepository, serviceRepository)
const vendorControllerInstance = new VendorController(vendorShopServiceInstance)

//----------------------------------------------------------- staff
const staffServiceInstance = new StaffService(staffRepository)
const staffControllerInstance = new StaffController(staffServiceInstance)

//------------------------------------------------------------ Service
const vendorServiceServiceInstance = new VendorServiceService(serviceRepository)
const vendorServiceControllerInstance = new VendorServiceController(vendorServiceServiceInstance)

export {
    vendorControllerInstance,
    staffControllerInstance,
    vendorServiceControllerInstance,
    staffRepository,
    vendorRepository,
    serviceRepository
}