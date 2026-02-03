import express from 'express'
import { verifyToken } from '../middlewares/authTokenVerify'
import { chatRoomControllerInstance } from '../di/chatDi'

const chatRoute = express.Router()


chatRoute.get('/chat-contract/:contractId',verifyToken,chatRoomControllerInstance.chatRoomData)


export default chatRoute