import express from 'express'
import { PaymentController } from '../controllers/payment/payment-controller'
import { paymentControllerInstance } from '../di/commonDi'

const paymentRoute = express.Router()

paymentRoute.post('/create',paymentControllerInstance.createPaymentIntent)

export default paymentRoute