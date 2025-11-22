import express from "express";
import { staffControllerInstance, vendorServiceControllerInstance, vendorControllerInstance } from "../di/vendorDi";
import { emailVerifyTokenMIddleware } from "../middlewares/emailTokenVerify";
import { verifyToken } from "../middlewares/authTokenVerify";
import { vendorBlockAuth } from "../middlewares/vendorBlockAuth";
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





//----------------------------------------------  vendor
vendorRoute.get('/shop-type',verifyToken,vendorBlockAuth,vendorControllerInstance.getShopServiceType)
vendorRoute.get('/shop-data',verifyToken,vendorBlockAuth,vendorControllerInstance.getShopData)
vendorRoute.post('/shop-data',verifyToken,vendorBlockAuth,vendorControllerInstance.addShopData)
vendorRoute.put('/shop/edit-shop',verifyToken,vendorBlockAuth,vendorControllerInstance.updateVendor)
vendorRoute.put('/shop/image',verifyToken,vendorBlockAuth,vendorControllerInstance.addShopImages)
vendorRoute.put('/shop/delete-image',verifyToken,vendorBlockAuth,vendorControllerInstance.removeShopImage)

//---------------------------------------------- dashboard
vendorRoute.get('/dashboard/data',verifyToken,vendorBlockAuth,vendorControllerInstance.vendorDashboard)


//---------------------------------------------- staff Routes
vendorRoute.post('/staff/add-staff',verifyToken,vendorBlockAuth,staffControllerInstance.addStaff)
vendorRoute.get('/staff',verifyToken,vendorBlockAuth,staffControllerInstance.getStaffsController)
vendorRoute.put('/staff/edit-staff',verifyToken,vendorBlockAuth,staffControllerInstance.editStaff)
vendorRoute.post('/staff/block-dates',verifyToken,vendorBlockAuth,staffControllerInstance.staffBlockedDate)

//---------------------------------------------- service Routes
vendorRoute.post('/service/add-service',verifyToken,vendorBlockAuth,vendorServiceControllerInstance.addNewService)
vendorRoute.get('/service/get-service',verifyToken,vendorBlockAuth,vendorServiceControllerInstance.getSerivces)
vendorRoute.put('/service/edit-service',verifyToken,vendorBlockAuth,vendorServiceControllerInstance.editService)



export default vendorRoute;

