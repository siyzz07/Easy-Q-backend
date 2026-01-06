
import  express from 'express'
import { isCustomer, isVendorOrCustomer, verifyToken } from '../middlewares/authTokenVerify'
import { customerBlockAuth } from '../middlewares/customerBlockAuth'
import { BookingControllerInstance } from '../di/commonDi'

const bookingRoute = express.Router()




bookingRoute.post('/add-booking',verifyToken,isVendorOrCustomer,BookingControllerInstance.addNewBooking)
bookingRoute.post('/check-time',verifyToken,isVendorOrCustomer,BookingControllerInstance.bookAvailableTime)
bookingRoute.get('/customer',verifyToken,isVendorOrCustomer,BookingControllerInstance.getCustomerBookings)
bookingRoute.get('/:id',verifyToken,isVendorOrCustomer,BookingControllerInstance.getSelectedBookingData)
bookingRoute.patch('/cancel/:bookingId',verifyToken,isCustomer,BookingControllerInstance.cancelBooking)

export default bookingRoute
