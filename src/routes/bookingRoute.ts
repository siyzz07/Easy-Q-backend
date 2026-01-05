
import  express from 'express'
import { isVendorOrCustomer, verifyToken } from '../middlewares/authTokenVerify'
import { customerBlockAuth } from '../middlewares/customerBlockAuth'
import { BookingControllerInstance } from '../di/commonDi'

const bookingRoute = express.Router()




bookingRoute.post('/add-booking',verifyToken,isVendorOrCustomer,customerBlockAuth,BookingControllerInstance.addNewBooking)
bookingRoute.post('/check-time',verifyToken,isVendorOrCustomer,customerBlockAuth,BookingControllerInstance.bookAvailableTime)
bookingRoute.get('/customer',verifyToken,isVendorOrCustomer,customerBlockAuth,BookingControllerInstance.getCustomerBookings)
bookingRoute.get('/:id',verifyToken,isVendorOrCustomer,customerBlockAuth,BookingControllerInstance.getSelectedBookingData)

export default bookingRoute
