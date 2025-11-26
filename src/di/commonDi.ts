import { BookingController } from "../controllers/booking/booking-controller"
import { BookingRepository } from "../repositories/bookingRepository"
import { ServiceRepository } from "../repositories/serviceRepository"
import { StaffRepository } from "../repositories/staffsRepository"
import { BookingService } from "../services/common-services/booking-service"


/**
 * 
 * 
 * 
 */
// ------------------ booking di
const bookingRepositoryInstance = new BookingRepository()
const serviceRepositoryInstance = new ServiceRepository()
const staffRepositoryInstance = new StaffRepository()
const bookingServiceInstance = new BookingService(bookingRepositoryInstance,serviceRepositoryInstance,staffRepositoryInstance)
const BookingControllerInstance = new BookingController(bookingServiceInstance)



export {BookingControllerInstance}