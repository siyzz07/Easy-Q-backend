import express from 'express'
import { verifyToken } from '../middlewares/authTokenVerify'
import { chatRoomControllerInstance, messageControllerInstance } from '../di/chatDi'

const chatRoute = express.Router()


chatRoute.get('/chat-contract/:contractId',verifyToken,chatRoomControllerInstance.chatRoomData)
chatRoute.get('/messages/:chatRoomId', verifyToken, messageControllerInstance.getMessages)
chatRoute.post('/vedio-call/start',verifyToken,chatRoomControllerInstance.startVedioCall)

export default chatRoute