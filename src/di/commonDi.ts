import { BookingController } from "../controllers/booking/booking-controller"
import { PaymentController } from "../controllers/payment/payment-controller"
import { ReviewRepository } from "../repositories/reviewRepository"
import { BookingService } from "../services/common-services/booking-service"
import { NotificationService } from "../services/common-services/notificaion-service"
import { ReviewService } from "../services/common-services/review-service"
import { 
    bookingRepository, 
    notificationRepository, 
    serviceRepository, 
    staffRepository,
    reviewRepository 
} from "./repositoriesDi"

// ------------------ Notificaton di
const notificationServiceInstance = new NotificationService(notificationRepository)

// ------------------ booking di
const bookingServiceInstance = new BookingService(bookingRepository, serviceRepository, staffRepository, notificationServiceInstance)
const BookingControllerInstance = new BookingController(bookingServiceInstance)


// ------------------ payment

const paymentControllerInstance = new PaymentController()

// ------------------ Review
const reviewServiceInstance = new ReviewService(reviewRepository)


export { BookingControllerInstance, notificationServiceInstance,paymentControllerInstance }