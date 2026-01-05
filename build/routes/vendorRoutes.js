"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendorDi_1 = require("../di/vendorDi");
const authTokenVerify_1 = require("../middlewares/authTokenVerify");
const vendorBlockAuth_1 = require("../middlewares/vendorBlockAuth");
const validate_1 = require("../middlewares/validate");
const staff_validation_1 = require("../validations/staff-validation");
const vendorRoute = express_1.default.Router();
//---------------------------------------------- Auth
// vendorRoute.post('/auth/verify-email',authControllerInstance.verifyEmail)
// vendorRoute.post('/auth/add-vendor',emailVerifyTokenMIddleware,authControllerInstance.addNewEntity)
// vendorRoute.post('/auth/login',authControllerInstance.login)
// vendorRoute.post('/reset-password/verify',authControllerInstance.resetPasswordEmailVerify)
// vendorRoute.post('/reset-password',emailVerifyTokenMIddleware,authControllerInstance.resetPassword)
// vendorRoute.post('/auth/refresh-token',authControllerInstance.refreshToken)
// vendorRoute.post('/logout',verifyToken,authControllerInstance.logout)
//----------------------------------------------  vendor
vendorRoute.get('/shop-type', authTokenVerify_1.verifyToken, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.vendorControllerInstance.getShopServiceType);
vendorRoute.get('/shop-data', authTokenVerify_1.verifyToken, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.vendorControllerInstance.getShopData);
vendorRoute.post('/shop-data', authTokenVerify_1.verifyToken, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.vendorControllerInstance.addShopData);
vendorRoute.put('/shop/edit-shop', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendor, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.vendorControllerInstance.updateVendor);
vendorRoute.put('/shop/image', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendor, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.vendorControllerInstance.addShopImages);
vendorRoute.put('/shop/delete-image', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendor, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.vendorControllerInstance.removeShopImage);
//---------------------------------------------- dashboard
vendorRoute.get('/dashboard/data', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendor, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.vendorControllerInstance.vendorDashboard);
//---------------------------------------------- staff Routes
vendorRoute.post('/staff/add-staff', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendor, vendorBlockAuth_1.vendorBlockAuth, (0, validate_1.validate)({ body: staff_validation_1.AddStaffSchema }), vendorDi_1.staffControllerInstance.addStaff);
vendorRoute.get('/staff', authTokenVerify_1.verifyToken, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.staffControllerInstance.getStaffsController);
vendorRoute.put('/staff/edit-staff', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendor, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.staffControllerInstance.editStaff);
vendorRoute.post('/staff/block-dates', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendor, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.staffControllerInstance.staffBlockedDate);
//---------------------------------------------- service Routes
vendorRoute.post('/service/add-service', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendor, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.vendorServiceControllerInstance.addNewService);
vendorRoute.get('/service/get-service', authTokenVerify_1.verifyToken, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.vendorServiceControllerInstance.getSerivces);
vendorRoute.put('/service/edit-service', authTokenVerify_1.verifyToken, authTokenVerify_1.isVendor, vendorBlockAuth_1.vendorBlockAuth, vendorDi_1.vendorServiceControllerInstance.editService);
exports.default = vendorRoute;
