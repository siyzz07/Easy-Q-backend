import express from 'express'

import { AddressControllerInstance, authContollerInstance, customerControllerInstance } from '../di/customerDi'
import { emailVerifyTokenMIddleware } from '../middlewares/emailTokenVerify'
import { verifyToken } from '../middlewares/authTokenVerify'
import { customerBlockAuth } from '../middlewares/customerBlockAuth'


const customerRoute = express.Router()





customerRoute.post('/auth/signup',authContollerInstance.addCustomer)
customerRoute.post('/auth/verify-email',emailVerifyTokenMIddleware,authContollerInstance.addVerifiedCustomer)
customerRoute.post('/auth/login', authContollerInstance.customerLogin)
customerRoute.post('/auth/refresh-token',authContollerInstance.refreshToken)
customerRoute.post('/reset-password',emailVerifyTokenMIddleware,authContollerInstance.resetPassword)
customerRoute.post('/reset-password/verify',authContollerInstance.resetPasswrodVerifyMail)
customerRoute.post ('/logout',authContollerInstance.logout)


//---------------------------------------------------------------------- shops
customerRoute.get('/shops-data',verifyToken,customerBlockAuth,customerControllerInstance.getShopsData)
customerRoute.get('/profile/customer-data',verifyToken,customerBlockAuth,customerControllerInstance.getCustomerData)
customerRoute.get('/shop-data/:id',verifyToken,customerBlockAuth,customerControllerInstance.shopDataEach)
customerRoute.get('/shop-data/services/:shopId',verifyToken,customerBlockAuth,customerControllerInstance.getShopServices)

//----------------------------------------------------------------------profile ,resetpasssword in profile and address Route
customerRoute.post('/profile/add-address',verifyToken,customerBlockAuth,AddressControllerInstance.addNewAddresss)
customerRoute.get('/profile/get-address',verifyToken,customerBlockAuth,AddressControllerInstance.getAddress)
customerRoute.post('/profile/delete-address',verifyToken,customerBlockAuth,AddressControllerInstance.deleteAddress)
customerRoute.post('/profile/edit-address',verifyToken,customerBlockAuth,AddressControllerInstance.editAddress)
customerRoute.post('/profile/edit-profile',verifyToken,customerBlockAuth,customerControllerInstance.editProfile)
customerRoute.post('/profile/change-password',verifyToken,customerBlockAuth,customerControllerInstance.changePassword)


export default customerRoute