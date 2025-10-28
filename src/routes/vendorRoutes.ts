import express from "express";
import { staffControllerInstance, vendorAuthControllerInstance, vendorServiceControllerInstance, vendorShopControllerInstance } from "../di/vendorDi";
import { emailVerifyTokenMIddleware } from "../middlewares/emailTokenVerify";
import { verifyToken } from "../middlewares/authTokenVerify";
import { vendorBlockAuth } from "../middlewares/vendorBlockAuth";
import { VendorServiceController } from "../controllers/vendorController/serviceController";




const vendorRoute = express.Router()




vendorRoute.post('/auth/verify-email',vendorAuthControllerInstance.verifyEmail)
vendorRoute.post('/auth/add-vendor',emailVerifyTokenMIddleware,vendorAuthControllerInstance.addNewVendor)
vendorRoute.post('/auth/login',vendorAuthControllerInstance.login)
vendorRoute.post('/auth/refresh-token',vendorAuthControllerInstance.refreshToken)
vendorRoute.post('/reset-password/verify',vendorAuthControllerInstance.resestPasswordEmailVerify)
vendorRoute.post('/reset-password',emailVerifyTokenMIddleware,vendorAuthControllerInstance.resetPassword)



vendorRoute.post('/shop-data',verifyToken,vendorBlockAuth,vendorShopControllerInstance.addShopData)
vendorRoute.get('/shop-data',verifyToken,vendorBlockAuth,vendorShopControllerInstance.getShopData)
vendorRoute.get('/shop-type',verifyToken,vendorBlockAuth,vendorShopControllerInstance.getShopServiceType)


//---------------------------------------------- staff Routes
vendorRoute.post('/staff/add-staff',verifyToken,vendorBlockAuth,staffControllerInstance.addStaff)
vendorRoute.get('/staff',verifyToken,vendorBlockAuth,staffControllerInstance.getStaffsController)
vendorRoute.put('/staff/edit-staff',verifyToken,vendorBlockAuth,staffControllerInstance.editStaff)

//---------------------------------------------- service Routes
vendorRoute.post('/service/add-service',verifyToken,vendorBlockAuth,vendorServiceControllerInstance.addNewService)
vendorRoute.get('/service/get-service',verifyToken,vendorBlockAuth,vendorServiceControllerInstance.getSerivces)
vendorRoute.put('/service/edit-service',verifyToken,vendorBlockAuth,vendorServiceControllerInstance.editService)

vendorRoute.post('/logout',verifyToken,vendorAuthControllerInstance.logout)

export default vendorRoute;

