import { BookingController } from "../controllers/booking/booking-controller"
import { BookingRepository } from "../repositories/bookingRepository"
import { NotificationRepository } from "../repositories/notificationRepository"
import { ServiceRepository } from "../repositories/serviceRepository"
import { StaffRepository } from "../repositories/staffsRepository"
import { BookingService } from "../services/common-services/booking-service"
// import { CacheService } from "../services/common-services/cache-service"
import { NotificationService } from "../services/common-services/notificaion-service"
import { socketManagerServer } from "../sockets/socketInstance"






// const cacheServiceInstance = new CacheService()
const bookingRepositoryInstance = new BookingRepository()
const serviceRepositoryInstance = new ServiceRepository()
const staffRepositoryInstance = new StaffRepository()
const notificationRepositoryInstance = new NotificationRepository()




/**
 * 
 * 
 * 
*/
// ------------------ Notificaton di

const notificationServiceInstance = new NotificationService(notificationRepositoryInstance,socketManagerServer)


/**
 * 
 * 
 * 
 */
// ------------------ booking di

const bookingServiceInstance = new BookingService(bookingRepositoryInstance,serviceRepositoryInstance,staffRepositoryInstance,notificationServiceInstance)
const BookingControllerInstance = new BookingController(bookingServiceInstance)


export {BookingControllerInstance,notificationServiceInstance}