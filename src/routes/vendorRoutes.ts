import express from "express";
import { vendorAuthControllerInstance, vendorShopControllerInstance } from "../di/vendorDi";
import { emailVerifyTokenMIddleware } from "../middlewares/emailTokenVerify";
import { verifyToken } from "../middlewares/authTokenVerify";




const vendorRoute = express.Router()




vendorRoute.post('/auth/verify-email',vendorAuthControllerInstance.verifyEmail)
vendorRoute.post('/auth/add-vendor',emailVerifyTokenMIddleware,vendorAuthControllerInstance.addNewVendor)
vendorRoute.post('/auth/login',vendorAuthControllerInstance.login)
vendorRoute.post('/auth/refresh-token',vendorAuthControllerInstance.refreshToken)



vendorRoute.post('/shop-data',verifyToken,vendorShopControllerInstance.addShopData)
vendorRoute.get('/shop-data',verifyToken,vendorShopControllerInstance.getShopData)

vendorRoute.post('/logout',verifyToken,vendorAuthControllerInstance.logout)

export default vendorRoute;

