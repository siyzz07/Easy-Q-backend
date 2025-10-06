import express from 'express'

import { authContollerInstance } from '../di/customerDi'
import { emailVerifyTokenMIddleware } from '../middlewares/emailTokenVerify'


const customerRoute = express.Router()





customerRoute.post('/auth/signup',authContollerInstance.addCustomer)
customerRoute.post('/auth/verify-email',emailVerifyTokenMIddleware,authContollerInstance.addVerifiedCustomer)
customerRoute.post('/auth/login', authContollerInstance.customerLogin)
customerRoute.post('/auth/refresh-token',authContollerInstance.refreshToken)


export default customerRoute