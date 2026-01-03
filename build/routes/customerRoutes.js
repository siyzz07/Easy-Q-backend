"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerDi_1 = require("../di/customerDi");
const authTokenVerify_1 = require("../middlewares/authTokenVerify");
const customerBlockAuth_1 = require("../middlewares/customerBlockAuth");
const vendorDi_1 = require("../di/vendorDi");
const validate_1 = require("../middlewares/validate");
const address_validation_1 = require("../validations/address-validation");
// import { addAddressSchema, editAddressSchema } from '../validations/address-Validation'
const customerRoute = express_1.default.Router();
/**
 *
 *  Auth
 *
 */
// customerRoute.post('/auth/signup',authControllerInstance.verifyEmail)
// customerRoute.post('/auth/verify-email',emailVerifyTokenMIddleware,authControllerInstance.addNewEntity)
// customerRoute.post('/auth/login',authControllerInstance.login )
// customerRoute.post('/reset-password/verify',authControllerInstance.resetPasswordEmailVerify)
// customerRoute.post('/reset-password',emailVerifyTokenMIddleware,authControllerInstance.resetPassword)
// customerRoute.post('/auth/refresh-token',authControllerInstance.refreshToken)
// customerRoute.post ('/logout',verifyToken,authControllerInstance.logout)
/**
 *
 *  Vendor
 *
 */
customerRoute.get('/shops-data', authTokenVerify_1.verifyToken, customerBlockAuth_1.customerBlockAuth, vendorDi_1.vendorControllerInstance.getShopsData);
customerRoute.get('/shop-data/:id', authTokenVerify_1.verifyToken, customerBlockAuth_1.customerBlockAuth, vendorDi_1.vendorControllerInstance.shopDataEach);
/**
 *
 *  Service (vedor srvice)
 *
 */
customerRoute.get('/shop-data/services/:shopId', authTokenVerify_1.verifyToken, customerBlockAuth_1.customerBlockAuth, vendorDi_1.vendorServiceControllerInstance.getShopServices);
customerRoute.get('/service/get-service', authTokenVerify_1.verifyToken, customerBlockAuth_1.customerBlockAuth, vendorDi_1.vendorServiceControllerInstance.getSelectedService);
/**
 *
 *  Cstomre
 *
 */
customerRoute.get('/profile/customer-data', authTokenVerify_1.verifyToken, customerBlockAuth_1.customerBlockAuth, customerDi_1.customerControllerInstance.getCustomerData);
customerRoute.post('/profile/edit-profile', authTokenVerify_1.verifyToken, authTokenVerify_1.isCustomer, customerBlockAuth_1.customerBlockAuth, customerDi_1.customerControllerInstance.editProfile);
customerRoute.post('/profile/change-password', authTokenVerify_1.verifyToken, authTokenVerify_1.isCustomer, customerBlockAuth_1.customerBlockAuth, customerDi_1.customerControllerInstance.changePassword);
/**
 *
 *  Address
 *
 */
customerRoute.get('/profile/get-address', authTokenVerify_1.verifyToken, customerBlockAuth_1.customerBlockAuth, customerDi_1.AddressControllerInstance.getAddress);
customerRoute.post('/profile/delete-address', authTokenVerify_1.verifyToken, customerBlockAuth_1.customerBlockAuth, customerDi_1.AddressControllerInstance.deleteAddress);
customerRoute.post('/profile/edit-address', authTokenVerify_1.verifyToken, customerBlockAuth_1.customerBlockAuth, (0, validate_1.validate)({ body: address_validation_1.editAddressSchema }), customerDi_1.AddressControllerInstance.editAddress);
customerRoute.post('/profile/add-address', authTokenVerify_1.verifyToken, customerBlockAuth_1.customerBlockAuth, (0, validate_1.validate)({ body: address_validation_1.addAddressSchema }), customerDi_1.AddressControllerInstance.addNewAddresss);
customerRoute.get('/profile/get-each-address', authTokenVerify_1.verifyToken, customerBlockAuth_1.customerBlockAuth, customerDi_1.AddressControllerInstance.eachAddressData);
/**
 *
 *  booking
 *
 */
// customerRoute.post('/booking/add-booking',verifyToken,customerBlockAuth,BookingControllerInstance.addNewBooking)
// customerRoute.post('/booking/check-time',verifyToken,customerBlockAuth,BookingControllerInstance.bookAvailableTime)
// // customerRoute.get('/booking/get-checkout-data',verifyToken,customerBlockAuth,BookingController.g)
/**
 *
 *  favorite
 *
 */
customerRoute.post('/favorite', authTokenVerify_1.verifyToken, authTokenVerify_1.isCustomer, customerBlockAuth_1.customerBlockAuth, customerDi_1.favoriteControllerInstance.updateFavorite);
customerRoute.get('/favorite', authTokenVerify_1.verifyToken, authTokenVerify_1.isCustomer, customerBlockAuth_1.customerBlockAuth, customerDi_1.favoriteControllerInstance.getFavorites);
customerRoute.get('/favorite/shopes', authTokenVerify_1.verifyToken, authTokenVerify_1.isCustomer, customerBlockAuth_1.customerBlockAuth, customerDi_1.favoriteControllerInstance.getFavoriteShopes);
exports.default = customerRoute;
