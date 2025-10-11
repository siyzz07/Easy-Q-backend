import express from 'express'

import { authContollerInstance, customerControllerInstance } from '../di/customerDi'
import { emailVerifyTokenMIddleware } from '../middlewares/emailTokenVerify'


const customerRoute = express.Router()





customerRoute.post('/auth/signup',authContollerInstance.addCustomer)
customerRoute.post('/auth/verify-email',emailVerifyTokenMIddleware,authContollerInstance.addVerifiedCustomer)
customerRoute.post('/auth/login', authContollerInstance.customerLogin)
customerRoute.post('/auth/refresh-token',authContollerInstance.refreshToken)
customerRoute.post('/reset-password/verify',authContollerInstance.resetPasswrodVerifyMail)
customerRoute.get('/shops-data',customerControllerInstance.getShopsData)
customerRoute.post('/reset-password',emailVerifyTokenMIddleware,authContollerInstance.resetPassword)





export default customerRoute