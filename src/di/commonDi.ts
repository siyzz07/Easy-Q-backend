import { BookingController } from "../controllers/booking/booking-controller"
import { BookingRepository } from "../repositories/bookingRepository"
import { ServiceRepository } from "../repositories/serviceRepository"
import { StaffRepository } from "../repositories/staffsRepository"
import { BookingService } from "../services/common-services/booking-service"
import { CacheService } from "../services/common-services/cache-service"





const cacheServiceInstance = new CacheService()

/**
 * 
 * 
 * 
 */
// ------------------ booking di
const bookingRepositoryInstance = new BookingRepository()
const serviceRepositoryInstance = new ServiceRepository()
const staffRepositoryInstance = new StaffRepository()
const bookingServiceInstance = new BookingService(bookingRepositoryInstance,serviceRepositoryInstance,staffRepositoryInstance,cacheServiceInstance)
const BookingControllerInstance = new BookingController(bookingServiceInstance)





export {BookingControllerInstance}