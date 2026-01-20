import express from 'express'
import { verifyToken } from '../middlewares/authTokenVerify'
import { notificationControllerInstance } from '../di/commonDi'




const notificaionRoute = express.Router()


notificaionRoute.get('/notifications',verifyToken,notificationControllerInstance.getNotification)


export default notificaionRoute


