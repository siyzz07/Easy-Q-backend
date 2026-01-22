
import  express from 'express'
import { isCustomer, isVendor, isVendorOrCustomer, verifyToken } from '../middlewares/authTokenVerify'
import { customerBlockAuth } from '../middlewares/customerBlockAuth'
import { BookingControllerInstance } from '../di/commonDi'

const bookingRoute = express.Router()




bookingRoute.post('/add-booking',verifyToken,isVendorOrCustomer,BookingControllerInstance.addNewBooking)
bookingRoute.post('/check-time',verifyToken,isVendorOrCustomer,BookingControllerInstance.bookAvailableTime)
bookingRoute.get('/customer',verifyToken,isVendorOrCustomer,BookingControllerInstance.getCustomerBookings)
bookingRoute.get('/vendor',verifyToken,isVendor,BookingControllerInstance.getVendorBookings)

bookingRoute.get('/:role/:id',verifyToken,isVendorOrCustomer,BookingControllerInstance.getSelectedBookingData)

bookingRoute.patch('/cancel/:bookingId',verifyToken,isCustomer,BookingControllerInstance.cancelBooking)

bookingRoute.post('/refund/:bookingId',verifyToken,BookingControllerInstance.refundBooking)
bookingRoute.get('/review-eligibility/:vendorId',verifyToken,BookingControllerInstance.isThereBooking)

bookingRoute.patch('/reschedule',verifyToken,isCustomer,BookingControllerInstance.bookingTimeReschedule)

bookingRoute.patch('/status/:bookingId',verifyToken,isVendor,BookingControllerInstance.statusUpdate)

export default bookingRoute
