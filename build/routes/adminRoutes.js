"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminDi_1 = require("../di/adminDi");
const authTokenVerify_1 = require("../middlewares/authTokenVerify");
const customerDi_1 = require("../di/customerDi");
const vendorDi_1 = require("../di/vendorDi");
const adminRoute = express_1.default.Router();
/**
 *
 * Dashboard
 *
 */
adminRoute.get('/admin-dashboard', authTokenVerify_1.verifyToken, authTokenVerify_1.isAdmin, adminDi_1.adminController.dashboardData);
/**
 *
 * Service Types
 *
*/
adminRoute.post("/service/add-service", authTokenVerify_1.verifyToken, authTokenVerify_1.isAdmin, adminDi_1.serviceTypesControllerInstence.addServiceType);
adminRoute.get('/service/get-services', authTokenVerify_1.verifyToken, authTokenVerify_1.isAdmin, adminDi_1.serviceTypesControllerInstence.getServiceTypes);
adminRoute.put('/service/edit-service', authTokenVerify_1.verifyToken, authTokenVerify_1.isAdmin, adminDi_1.serviceTypesControllerInstence.editServiceType);
/**
 *
 * Customer
 *
 */
adminRoute.get("/data/customers", authTokenVerify_1.verifyToken, authTokenVerify_1.isAdmin, customerDi_1.customerControllerInstance.getUserDatas);
adminRoute.post("/data/block-customer", authTokenVerify_1.verifyToken, authTokenVerify_1.isAdmin, customerDi_1.customerControllerInstance.blockCustomer);
/**
 *
 * Vendor
 *
 */
adminRoute.get("/data/vendors", authTokenVerify_1.verifyToken, authTokenVerify_1.isAdmin, vendorDi_1.vendorControllerInstance.geVendorsDatas);
adminRoute.post("/data/block-vendor", authTokenVerify_1.verifyToken, authTokenVerify_1.isAdmin, vendorDi_1.vendorControllerInstance.blockVendor);
adminRoute.get('/data/vendors-request', authTokenVerify_1.verifyToken, authTokenVerify_1.isAdmin, vendorDi_1.vendorControllerInstance.getVendorsRequest);
adminRoute.post('/data/verified-vendor', authTokenVerify_1.verifyToken, authTokenVerify_1.isAdmin, vendorDi_1.vendorControllerInstance.acceptVendorRequest);
adminRoute.post('/data/reject-vendor', authTokenVerify_1.verifyToken, authTokenVerify_1.isAdmin, vendorDi_1.vendorControllerInstance.rejectVendorRequest);
exports.default = adminRoute;
