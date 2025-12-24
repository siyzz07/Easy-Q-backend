import express from "express";
import { adminController, serviceTypesControllerInstence } from "../di/adminDi";
import { verifyToken } from "../middlewares/authTokenVerify";
import { authControllerInstance } from "../di/authDi";
import { customerControllerInstance } from "../di/customerDi";
import { vendorControllerInstance } from "../di/vendorDi";

const adminRoute = express.Router();







/**
 * 
 * Dashboard
 * 
 */
adminRoute.get('/admin-dashboard',verifyToken,adminController.dashboardData)

/**
 *  
 * Service Types
 * 
*/
adminRoute.post("/service/add-service",verifyToken,serviceTypesControllerInstence.addServiceType)
adminRoute.get('/service/get-services',verifyToken,serviceTypesControllerInstence.getServiceTypes)
adminRoute.put('/service/edit-service',verifyToken,serviceTypesControllerInstence.editServiceType)
/**
 * 
 * Customer
 * 
 */
adminRoute.get("/data/customers", verifyToken, customerControllerInstance.getUserDatas);
adminRoute.post("/data/block-customer",verifyToken,customerControllerInstance.blockCustomer);
/**
 * 
 * Vendor
 * 
 */
adminRoute.get("/data/vendors", verifyToken,vendorControllerInstance.geVendorsDatas);
adminRoute.post("/data/block-vendor", verifyToken, vendorControllerInstance.blockVendor);
adminRoute.get('/data/vendors-request',verifyToken,vendorControllerInstance.getVendorsRequest)
adminRoute.post('/data/verified-vendor',verifyToken,vendorControllerInstance.acceptVendorRequest)
adminRoute.post('/data/reject-vendor',verifyToken,vendorControllerInstance.rejectVendorRequest)








export default adminRoute;
