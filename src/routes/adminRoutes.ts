import express  from "express";
import { adminControllerInstance } from "../di/adminDi";




const adminRoute = express.Router()


adminRoute.post('/auth/login',adminControllerInstance.loginAdmin)
adminRoute.post('/auth/refresh-token',adminControllerInstance.refreshToken)
adminRoute.post ('/logout',adminControllerInstance.logout)

export default adminRoute