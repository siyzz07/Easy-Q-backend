import express from 'express'

import { AddressControllerInstance, customerControllerInstance } from '../di/customerDi'
import { emailVerifyTokenMIddleware } from '../middlewares/emailTokenVerify'
import { verifyToken } from '../middlewares/authTokenVerify'
import { customerBlockAuth } from '../middlewares/customerBlockAuth'
import { authControllerInstance } from '../di/authDi'
import { vendorControllerInstance, vendorServiceControllerInstance } from '../di/vendorDi'


const customerRoute = express.Router()

/**
 * 
 *  Auth
 * 
 */
customerRoute.post('/auth/signup',authControllerInstance.verifyEmail)
customerRoute.post('/auth/verify-email',emailVerifyTokenMIddleware,authControllerInstance.addNewEntity)
customerRoute.post('/auth/login',authControllerInstance.login )
customerRoute.post('/reset-password/verify',authControllerInstance.resetPasswordEmailVerify)
customerRoute.post('/reset-password',emailVerifyTokenMIddleware,authControllerInstance.resetPassword)
customerRoute.post('/auth/refresh-token',authControllerInstance.refreshToken)
customerRoute.post ('/logout',verifyToken,authControllerInstance.logout)

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
customerRoute.post('/profile/edit-address',verifyToken,customerBlockAuth,AddressControllerInstance.editAddress)
customerRoute.post('/profile/add-address',verifyToken,customerBlockAuth,AddressControllerInstance.addNewAddresss)








export default customerRoute