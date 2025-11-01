import express from "express";
import { staffControllerInstance, vendorAuthControllerInstance, vendorServiceControllerInstance, vendorShopControllerInstance } from "../di/vendorDi";
import { emailVerifyTokenMIddleware } from "../middlewares/emailTokenVerify";
import { verifyToken } from "../middlewares/authTokenVerify";
import { vendorBlockAuth } from "../middlewares/vendorBlockAuth";
import { VendorServiceController } from "../controllers/vendorController/serviceController";
import { authControllerInstance } from "../di/authDi";




const vendorRoute = express.Router()



//---------------------------------------------- Auth

vendorRoute.post('/auth/verify-email',authControllerInstance.verifyEmail)
vendorRoute.post('/auth/add-vendor',emailVerifyTokenMIddleware,authControllerInstance.addNewEntity)
vendorRoute.post('/auth/login',authControllerInstance.login)
vendorRoute.post('/reset-password/verify',authControllerInstance.resetPasswordEmailVerify)
vendorRoute.post('/reset-password',emailVerifyTokenMIddleware,authControllerInstance.resetPassword)
vendorRoute.post('/auth/refresh-token',authControllerInstance.refreshToken)
vendorRoute.post('/logout',verifyToken,authControllerInstance.logout)



//---------------------------------------------- dashboard
vendorRoute.get('/dashboard/data',verifyToken,vendorBlockAuth,vendorShopControllerInstance.vendorDashboard)
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



export default vendorRoute;

