
import  express from 'express'
import { verifyToken } from '../middlewares/authTokenVerify'
import { customerBlockAuth } from '../middlewares/customerBlockAuth'
import { BookingControllerInstance } from '../di/commonDi'

const bookingRoute = express.Router()




bookingRoute.post('/add-booking',verifyToken,customerBlockAuth,BookingControllerInstance.addNewBooking)
bookingRoute.post('/check-time',verifyToken,customerBlockAuth,BookingControllerInstance.bookAvailableTime)
bookingRoute.get('/customer',verifyToken,customerBlockAuth,BookingControllerInstance.getCustomerBookings)
bookingRoute.get('/:id',verifyToken,customerBlockAuth,BookingControllerInstance.getSelectedBookingData)

export default bookingRoute
