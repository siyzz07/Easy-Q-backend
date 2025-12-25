import express from 'express'

import { AddressControllerInstance, customerControllerInstance, favoriteControllerInstance } from '../di/customerDi'
import { emailVerifyTokenMIddleware } from '../middlewares/emailTokenVerify'
import { verifyToken } from '../middlewares/authTokenVerify'
import { customerBlockAuth } from '../middlewares/customerBlockAuth'
import { authControllerInstance } from '../di/authDi'
import { vendorControllerInstance, vendorServiceControllerInstance } from '../di/vendorDi'
import { BookingControllerInstance } from '../di/commonDi'
import { validate } from '../middlewares/validate'
import { addAddressSchema, editAddressSchema } from '../validations/address-Validation'



const customerRoute = express.Router()

/**
 * 
 *  Auth
 * 
 */
// customerRoute.post('/auth/signup',authControllerInstance.verifyEmail)
// customerRoute.post('/auth/verify-email',emailVerifyTokenMIddleware,authControllerInstance.addNewEntity)
// customerRoute.post('/auth/login',authControllerInstance.login )
// customerRoute.post('/reset-password/verify',authControllerInstance.resetPasswordEmailVerify)
// customerRoute.post('/reset-password',emailVerifyTokenMIddleware,authControllerInstance.resetPassword)
// customerRoute.post('/auth/refresh-token',authControllerInstance.refreshToken)
// customerRoute.post ('/logout',verifyToken,authControllerInstance.logout)

/**
 * 
 *  Vendor
 * 
 */

customerRoute.get('/shops-data',verifyToken,customerBlockAuth,vendorControllerInstance.getShopsData)
customerRoute.get('/shop-data/:id',verifyToken,customerBlockAuth,vendorControllerInstance.shopDataEach)

/**
 * 
 *  Service (vedor srvice)
 * 
 */
customerRoute.get('/shop-data/services/:shopId',verifyToken,customerBlockAuth,vendorServiceControllerInstance.getShopServices)
customerRoute.get('/service/get-service',verifyToken,customerBlockAuth,vendorServiceControllerInstance.getSelectedService)

/**
 * 
 *  Cstomre 
 * 
 */
customerRoute.get('/profile/customer-data',verifyToken,customerBlockAuth,customerControllerInstance.getCustomerData)
customerRoute.post('/profile/edit-profile',verifyToken,customerBlockAuth,customerControllerInstance.editProfile)
customerRoute.post('/profile/change-password',verifyToken,customerBlockAuth,customerControllerInstance.changePassword)

/**
 * 
 *  Address
 * 
 */
customerRoute.get('/profile/get-address',verifyToken,customerBlockAuth,AddressControllerInstance.getAddress)
customerRoute.post('/profile/delete-address',verifyToken,customerBlockAuth,AddressControllerInstance.deleteAddress)
customerRoute.post('/profile/edit-address',verifyToken,customerBlockAuth,validate({body:editAddressSchema}),AddressControllerInstance.editAddress)
customerRoute.post('/profile/add-address',verifyToken,customerBlockAuth,validate({body:addAddressSchema}),AddressControllerInstance.addNewAddresss)
customerRoute.get('/profile/get-each-address',verifyToken,customerBlockAuth,AddressControllerInstance.eachAddressData)

/**
 * 
 *  booking
 * 
 */
// customerRoute.post('/booking/add-booking',verifyToken,customerBlockAuth,BookingControllerInstance.addNewBooking)
// customerRoute.post('/booking/check-time',verifyToken,customerBlockAuth,BookingControllerInstance.bookAvailableTime)
// // customerRoute.get('/booking/get-checkout-data',verifyToken,customerBlockAuth,BookingController.g)


/**
 * 
 *  favorite 
 * 
 */
customerRoute.post('/favorite',verifyToken,customerBlockAuth,favoriteControllerInstance.updateFavorite)
customerRoute.get('/favorite',verifyToken,customerBlockAuth,favoriteControllerInstance.getFavorites)
customerRoute.get('/favorite/shopes',verifyToken,customerBlockAuth,favoriteControllerInstance.getFavoriteShopes)






export default customerRoute