import { BookingController } from "../controllers/booking/booking-controller"
import { ReviewController } from "../controllers/reviews/review-controller"
import { ReviewRepository } from "../repositories/reviewRepository"
import { BookingService } from "../services/common-services/booking-service"
import { NotificationService } from "../services/common-services/notificaion-service"
import { ReviewService } from "../services/common-services/review-service"
import { 
    bookingRepository, 
    notificationRepository, 
    serviceRepository, 
    staffRepository,
    reviewRepository, 
    transactionRepository
} from "./repositoriesDi"
import { TransactionService } from "../services/common-services/transaction-service"
import { TransactionController } from "../controllers/transaction/transaction-controller"

// ------------------ Notificaton di
const notificationServiceInstance = new NotificationService(notificationRepository)

// ------------------ booking di
const bookingServiceInstance = new BookingService(bookingRepository, serviceRepository, staffRepository, notificationServiceInstance)
const BookingControllerInstance = new BookingController(bookingServiceInstance)


// ------------------ transaction

const transactionServiceInstance = new TransactionService(transactionRepository,bookingRepository)
const transactionControllerInstance = new TransactionController(transactionServiceInstance)

// ------------------ Review
const reviewServiceInstance = new ReviewService(reviewRepository)
const reviewControllerInstance = new ReviewController(reviewServiceInstance)


export { BookingControllerInstance, notificationServiceInstance,reviewControllerInstance,transactionControllerInstance }