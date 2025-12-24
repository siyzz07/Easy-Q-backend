
import  express from 'express'
import { verifyToken } from '../middlewares/authTokenVerify'
import { customerBlockAuth } from '../middlewares/customerBlockAuth'
import { BookingControllerInstance } from '../di/commonDi'

const bookingRoute = express.Router()




bookingRoute.post('/add-booking',verifyToken,customerBlockAuth,BookingControllerInstance.addNewBooking)
bookingRoute.post('/check-time',verifyToken,customerBlockAuth,BookingControllerInstance.bookAvailableTime)
// customerRoute.get('/booking/get-checkout-data',verifyToken,customerBlockAuth,BookingController.g)

export default bookingRoute
