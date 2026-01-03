import { BookingController } from "../controllers/booking/booking-controller"
import { BookingService } from "../services/common-services/booking-service"
import { NotificationService } from "../services/common-services/notificaion-service"
import { 
    bookingRepository, 
    notificationRepository, 
    serviceRepository, 
    staffRepository 
} from "./repositoriesDi"

// ------------------ Notificaton di
const notificationServiceInstance = new NotificationService(notificationRepository)

// ------------------ booking di
const bookingServiceInstance = new BookingService(bookingRepository, serviceRepository, staffRepository, notificationServiceInstance)
const BookingControllerInstance = new BookingController(bookingServiceInstance)

export { BookingControllerInstance, notificationServiceInstance }