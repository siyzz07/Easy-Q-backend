import express from "express";
import { adminController, serviceTypesControllerInstence } from "../di/adminDi";
import { isAdmin, verifyToken } from "../middlewares/authTokenVerify";
import { customerControllerInstance } from "../di/customerDi"; // Kept if needed for other things, but likely removable
import { vendorControllerInstance } from "../di/vendorDi"; // Kept if needed

const adminRoute = express.Router();

/**
 * 
 * Dashboard
 * 
 */
adminRoute.get('/admin-dashboard', verifyToken, isAdmin, adminController.dashboardData)

/**
 *  
 * Service Types
 * 
 */
adminRoute.post("/service/add-service", verifyToken, isAdmin, serviceTypesControllerInstence.addServiceType)
adminRoute.get('/service/get-services', verifyToken, isAdmin, serviceTypesControllerInstence.getServiceTypes)
adminRoute.put('/service/edit-service', verifyToken, isAdmin, serviceTypesControllerInstence.editServiceType)

/**
 * 
 * Customer
 * 
 */
adminRoute.get("/data/customers", verifyToken, isAdmin, adminController.getCustomers);
adminRoute.post("/data/block-customer", verifyToken, isAdmin, adminController.blockCustomer);

/**
 * 
 * Vendor
 * 
 */
adminRoute.get("/data/vendors", verifyToken, isAdmin, adminController.getVendors);
adminRoute.post("/data/block-vendor", verifyToken, isAdmin, adminController.blockVendor);
adminRoute.get('/data/vendors-request', verifyToken, isAdmin, adminController.getVendorsRequest)
adminRoute.post('/data/verified-vendor', verifyToken, isAdmin, adminController.acceptVendorRequest)
adminRoute.post('/data/reject-vendor', verifyToken, isAdmin, adminController.rejectVendorRequest)


export default adminRoute;
