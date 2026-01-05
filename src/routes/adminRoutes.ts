import express from "express";
import { adminController, serviceTypesControllerInstence } from "../di/adminDi";
import { isAdmin, verifyToken } from "../middlewares/authTokenVerify";
import { authControllerInstance } from "../di/authDi";
import { customerControllerInstance } from "../di/customerDi";
import { vendorControllerInstance } from "../di/vendorDi";

const adminRoute = express.Router();







/**
 * 
 * Dashboard
 * 
 */
adminRoute.get('/admin-dashboard',verifyToken,isAdmin,adminController.dashboardData)

/**
 *  
 * Service Types
 * 
*/
adminRoute.post("/service/add-service",verifyToken,isAdmin,serviceTypesControllerInstence.addServiceType)
adminRoute.get('/service/get-services',verifyToken,isAdmin,serviceTypesControllerInstence.getServiceTypes)
adminRoute.put('/service/edit-service',verifyToken,isAdmin,serviceTypesControllerInstence.editServiceType)
/**
 * 
 * Customer
 * 
 */
adminRoute.get("/data/customers", verifyToken,isAdmin, customerControllerInstance.getUserDatas);
adminRoute.post("/data/block-customer",verifyToken,isAdmin,customerControllerInstance.blockCustomer);
/**
 * 
 * Vendor
 * 
 */
adminRoute.get("/data/vendors", verifyToken,isAdmin,vendorControllerInstance.geVendorsDatas);
adminRoute.post("/data/block-vendor", verifyToken,isAdmin, vendorControllerInstance.blockVendor);
adminRoute.get('/data/vendors-request',verifyToken,isAdmin,vendorControllerInstance.getVendorsRequest)
adminRoute.post('/data/verified-vendor',verifyToken,isAdmin,vendorControllerInstance.acceptVendorRequest)
adminRoute.post('/data/reject-vendor',verifyToken,isAdmin,vendorControllerInstance.rejectVendorRequest)








export default adminRoute;
