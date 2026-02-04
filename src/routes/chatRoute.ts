import express from 'express'
import { isVendorOrCustomer, verifyToken } from '../middlewares/authTokenVerify'
import { chatRoomControllerInstance, messageControllerInstance } from '../di/chatDi'

const chatRoute = express.Router()


chatRoute.get('/chat-contract/:contractId',verifyToken,isVendorOrCustomer,chatRoomControllerInstance.chatRoomData)
chatRoute.get('/messages/:chatRoomId', verifyToken, isVendorOrCustomer,messageControllerInstance.getMessages)
chatRoute.post('/vedio-call/start',verifyToken,isVendorOrCustomer,chatRoomControllerInstance.startVedioCall)
chatRoute.get('/zego/token',chatRoomControllerInstance.getZegocloudToken)
chatRoute.post('/leave-vedio',chatRoomControllerInstance.leaveVedioCall)

export default chatRoute