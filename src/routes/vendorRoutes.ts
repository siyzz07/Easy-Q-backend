import express from "express";
import { vendorAuthControllerInstance, vendorShopControllerInstance } from "../di/vendorDi";
import { emailVerifyTokenMIddleware } from "../middlewares/emailTokenVerify";
import { verifyToken } from "../middlewares/authTokenVerify";
import { vendorBlockAuth } from "../middlewares/vendorBlockAuth";




const vendorRoute = express.Router()




vendorRoute.post('/auth/verify-email',vendorAuthControllerInstance.verifyEmail)
vendorRoute.post('/auth/add-vendor',emailVerifyTokenMIddleware,vendorAuthControllerInstance.addNewVendor)
vendorRoute.post('/auth/login',vendorAuthControllerInstance.login)
vendorRoute.post('/auth/refresh-token',vendorAuthControllerInstance.refreshToken)
vendorRoute.post('/reset-password/verify',vendorAuthControllerInstance.resestPasswordEmailVerify)
vendorRoute.post('/reset-password',emailVerifyTokenMIddleware,vendorAuthControllerInstance.resetPassword)



vendorRoute.post('/shop-data',verifyToken,vendorBlockAuth,vendorShopControllerInstance.addShopData)
vendorRoute.get('/shop-data',verifyToken,vendorBlockAuth,vendorShopControllerInstance.getShopData)


vendorRoute.post('/logout',verifyToken,vendorAuthControllerInstance.logout)

export default vendorRoute;

