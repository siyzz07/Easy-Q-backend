import express from 'express'
import { transactionControllerInstance } from '../di/commonDi'
import { isCustomer, verifyToken } from '../middlewares/authTokenVerify'


const transactionRoute = express.Router()

transactionRoute.post('/create-pay',verifyToken,isCustomer,transactionControllerInstance.createPaymentIntent)
transactionRoute.post('/verify',verifyToken,isCustomer,transactionControllerInstance.verifyPament)

export default transactionRoute