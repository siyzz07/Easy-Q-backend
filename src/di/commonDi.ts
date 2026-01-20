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
    transactionRepository,
    walletRepository,
    vendorRepository
} from "./repositoriesDi"
import { TransactionService } from "../services/common-services/transaction-service"
import { TransactionController } from "../controllers/transaction/transaction-controller"
import { WalletService } from "../services/common-services/wallet-service"
import { WalletController } from "../controllers/wallet/wallet-controller"
import { NotificaionController } from "../controllers/notification/notificaion-controller"

// ------------------ Notificaton di
const notificationServiceInstance = new NotificationService(notificationRepository)
const notificationControllerInstance = new NotificaionController(notificationServiceInstance)


// ------------------ wallet
const walletServiceInstance = new WalletService(walletRepository)
const walletControllerInstance = new WalletController(walletServiceInstance)

// ------------------ transaction

const transactionServiceInstance = new TransactionService(transactionRepository,bookingRepository)
const transactionControllerInstance = new TransactionController(transactionServiceInstance)


// ------------------ booking di
const bookingServiceInstance = new BookingService(bookingRepository, serviceRepository, staffRepository, notificationServiceInstance,walletServiceInstance,transactionRepository)
const BookingControllerInstance = new BookingController(bookingServiceInstance)




// ------------------ Review
const reviewServiceInstance = new ReviewService(reviewRepository,vendorRepository)
const reviewControllerInstance = new ReviewController(reviewServiceInstance)



export { 
    BookingControllerInstance, 
    notificationServiceInstance,
    reviewControllerInstance,
    transactionControllerInstance,
    walletControllerInstance,
    notificationControllerInstance
 }