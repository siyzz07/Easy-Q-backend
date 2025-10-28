import express from "express";
import { adminController, adminControllerInstance, serviceTypesControllerInstence } from "../di/adminDi";
import { verifyToken } from "../middlewares/authTokenVerify";

const adminRoute = express.Router();

adminRoute.post("/auth/login", adminControllerInstance.loginAdmin);
adminRoute.post("/auth/refresh-token", adminControllerInstance.refreshToken);
adminRoute.post("/logout", adminControllerInstance.logout);

//----------------------------------------------------- customer data
adminRoute.get("/data/customers", verifyToken, adminController.getUserDatas);
adminRoute.post("/data/block-customer",verifyToken,adminController.blockCustomer
);

//----------------------------------------------------- vendors data
adminRoute.get("/data/vendors", verifyToken, adminController.geVendorsDatas);
adminRoute.post("/data/block-vendor", verifyToken, adminController.blockVendor);

//----------------------------------------------------- vendors verification
adminRoute.get('/data/vendors-request',verifyToken,adminController.getVendorsRequest)
adminRoute.post('/data/verified-vendor',verifyToken,adminController.acceptVendorRequest)
adminRoute.post('/data/reject-vendor',verifyToken,adminController.rejectVendorRequest)

//----------------------------------------------------- dashboard
adminRoute.get('/admin-dashboard',verifyToken,adminController.dashboardData)

//----------------------------------------------------- services
adminRoute.post("/service/add-service",verifyToken,serviceTypesControllerInstence.addServiceType)
adminRoute.get('/service/get-services',verifyToken,serviceTypesControllerInstence.getServiceTypes)
adminRoute.put('/service/edit-service',verifyToken,serviceTypesControllerInstence.editServiceType)




export default adminRoute;
