"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
const errorResponse_1 = require("../../utils/errorResponse");
const hash_1 = require("../../utils/hash");
const jwt_1 = require("../../utils/jwt");
const logger_1 = __importDefault(require("../../utils/logger"));
const nodeMailer_1 = require("../../utils/nodeMailer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_1 = require("../../enums/role");
class AuthService {
    constructor(vendorRpository, customerRepository, adminRepository) {
        /**
         *
         * -------------------------handle singup --------------
         *
         * if vendor or customer try to sign up , want to verify their mail
         */
        // ----------------------------------------------- verify the signup email
        this.verifyEmail = async (data) => {
            const { role, ...payload } = { ...data };
            if (role === role_1.RoleEnum.CUSTOMER.toLowerCase()) {
                //---handle customer
                const email = payload.email;
                const exist = await this._customerRepository.checkCustomerExist(email);
                if (exist) {
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.CUSTOMER_ALREADY_EXISTS, httpStatusCodeEnum_1.StatusCodeEnum.CONFLICT);
                }
                else {
                    const token = (0, jwt_1.generateJwtToken)({ ...payload, role });
                    await (0, nodeMailer_1.sendEmail)(email, `${process.env.CUSTOMER_VERIFY_MAIL}?token=${token}`);
                }
            }
            else if (role === role_1.RoleEnum.VENDOR.toLowerCase()) {
                //--- handle vendor
                const email = payload.email;
                let vendorDataVerified = false;
                const exist = await this._vendorRepository.checkVendorExist(email);
                if (exist) {
                    const vendorData = await this._vendorRepository.vendorData(email);
                    vendorDataVerified =
                        vendorData.isVerified === "pending" ||
                            vendorData.isVerified === "verified";
                }
                if (exist && vendorDataVerified) {
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_EXISTS, httpStatusCodeEnum_1.StatusCodeEnum.CONFLICT);
                }
                else {
                    if (exist) {
                        await this._vendorRepository.deleteVendor(email);
                    }
                    const token = (0, jwt_1.generateJwtToken)(data);
                    await (0, nodeMailer_1.sendEmail)(email, `${process.env.VENDOR_VERIFY_MAIL}?token=${token}`);
                }
            }
            else {
                logger_1.default.error(messagesEnum_1.MessageEnum.ROLE_NOT_FOUND);
            }
        };
        // ----------------------------------------------- add new  verified Enitity (customer/vendor)
        this.addNewEntity = async (data) => {
            const { role, password, ...payload } = { ...data };
            const hashedPassword = await (0, hash_1.hashPassword)(password);
            if (role == role_1.RoleEnum.CUSTOMER.toLowerCase()) {
                //- handle customer
                const exitst = await this._customerRepository.checkCustomerExist(payload.email);
                if (!exitst) {
                    const values = {
                        ...payload,
                        password: hashedPassword,
                    };
                    const result = await this._customerRepository.addNewCustomer(values);
                    if (result) {
                        return true;
                    }
                    else {
                        logger_1.default.error("error to add new customer");
                        throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.CUSTOMER_ADD_ERROR, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
                    }
                }
            }
            else if (role == role_1.RoleEnum.VENDOR.toLowerCase()) {
                //- handle vendor
                const exist = await this._vendorRepository.checkVendorExist(payload.email);
                if (exist) {
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_EXISTS, httpStatusCodeEnum_1.StatusCodeEnum.CONFLICT);
                }
                const values = {
                    ...payload,
                    password: hashedPassword,
                };
                const result = await this._vendorRepository.addNewVendor(values);
                if (result) {
                    return true;
                }
                else {
                    logger_1.default.error("error to add new vendor");
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_ADD_ERROR, httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR);
                }
            }
            else {
                logger_1.default.error(messagesEnum_1.MessageEnum.ROLE_NOT_FOUND);
            }
        };
        /**
         *
         *     login  entity  service
         *
         */
        this.login = async (data) => {
            const { email, password, role } = data;
            if (role == role_1.RoleEnum.CUSTOMER.toLowerCase()) {
                const checkCustomer = await this._customerRepository.checkCustomerExist(email);
                if (!checkCustomer) {
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.CUSTOMER_NOT_FOUND, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
                }
                const customerData = await this._customerRepository.customerDataByEmail(email);
                if (customerData) {
                    if (customerData.isActive) {
                        const passwordMatch = await (0, hash_1.comparePassword)(password, customerData.password);
                        if (!passwordMatch) {
                            throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.INVALID_CREDENTIALS, httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST);
                        }
                        const payload = {
                            userId: customerData._id,
                            role: role_1.RoleEnum.CUSTOMER,
                        };
                        const AccessToken = (0, jwt_1.accessToken)(payload);
                        const RefreshToken = (0, jwt_1.refreshToken)(payload);
                        return {
                            accessToken: AccessToken,
                            refreshToken: RefreshToken,
                            role: role_1.RoleEnum.CUSTOMER,
                        };
                    }
                    else {
                        throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.CUSTOMER_BLOCKED, httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST);
                    }
                }
            }
            else if (role == role_1.RoleEnum.VENDOR.toLowerCase()) {
                const checkVendorExist = await this._vendorRepository.checkVendorExist(email);
                if (!checkVendorExist) {
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_NOT_FOUND, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
                }
                else {
                    const vendorData = await this._vendorRepository.vendorData(email);
                    if (vendorData.isVerified == "pending") {
                        throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_UNDER_VERIFICATION, httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST);
                    }
                    else if (vendorData.isVerified == "rejected") {
                        throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_VERIFICATION_REJECTED, httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST);
                    }
                    else {
                        if (!vendorData.isActive) {
                            throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_BLOCKED, httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST);
                        }
                        const passwordMatch = await (0, hash_1.comparePassword)(password, vendorData.password);
                        if (!passwordMatch) {
                            throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.INVALID_CREDENTIALS, httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST);
                        }
                        else {
                            const payload = {
                                userId: vendorData._id,
                                role: role_1.RoleEnum.VENDOR,
                            };
                            const AccessToken = (0, jwt_1.accessToken)(payload);
                            const RefreshToken = (0, jwt_1.refreshToken)(payload);
                            return {
                                accessToken: AccessToken,
                                refreshToken: RefreshToken,
                                entityData: vendorData,
                                role: role_1.RoleEnum.VENDOR,
                            };
                        }
                    }
                }
            }
            else if (role == role_1.RoleEnum.ADMIN.toLowerCase()) {
                const adminExist = await this._adminRepository.checkAdminExist(email);
                if (!adminExist) {
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.ADMIN_NOT_FOUND, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
                }
                const adminData = await this._adminRepository.adminDataByEmail(email);
                const mathcPassword = await (0, hash_1.comparePassword)(password, adminData.password);
                if (!mathcPassword) {
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.ADMIN_PASSWORD_INCORRECT, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
                }
                if (adminData) {
                    const payload = {
                        userId: adminData._id,
                        role: role_1.RoleEnum.ADMIN,
                    };
                    const AccessToken = (0, jwt_1.accessToken)(payload);
                    const RefreshToken = (0, jwt_1.refreshToken)(payload);
                    return {
                        accessToken: AccessToken,
                        refreshToken: RefreshToken,
                        role: role_1.RoleEnum.ADMIN,
                    };
                }
            }
            else {
                logger_1.default.error(messagesEnum_1.MessageEnum.ROLE_NOT_FOUND);
            }
        };
        /**
         *
         *  Reset password reset  passwrod
         *
         */
        // ----------------------------------------------- verify the email for reset the password
        this.resetPasswordEmailVerify = async (data) => {
            const { email, role } = data;
            let baseUrl;
            switch (role) {
                case role_1.RoleEnum.CUSTOMER.toLowerCase(): {
                    const exist = await this._customerRepository.checkCustomerExist(email);
                    if (!exist) {
                        throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.CUSTOMER_NOT_FOUND, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
                    }
                    baseUrl = process.env.CUSTOMER_FORGOT_PASSWORD;
                    break;
                }
                case role_1.RoleEnum.VENDOR.toLowerCase(): {
                    const exist = await this._vendorRepository.checkVendorExist(email);
                    if (!exist) {
                        // throw new Error(MessageEnum.VENDOR_NOT_FOUND);
                        throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_NOT_FOUND, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
                    }
                    baseUrl = process.env.VENDOR_FORGOT_PASSWORD;
                    break;
                }
                default: {
                    logger_1.default.error(messagesEnum_1.MessageEnum.ROLE_NOT_FOUND, "in Reset passwrod email verify");
                    break;
                }
            }
            if (role === role_1.RoleEnum.CUSTOMER.toLowerCase() || role == role_1.RoleEnum.VENDOR.toLowerCase()) {
                const token = (0, jwt_1.generateJwtToken)({ email });
                await (0, nodeMailer_1.sendEmail)(email, `${baseUrl}?token=${token}`);
                return true;
            }
            else {
                logger_1.default.error("error to send mail for send verify email");
            }
        };
        // ----------------------------------------------- reset password
        this.resetPassword = async (data) => {
            const { email, password, role } = data;
            const hashedPassword = await (0, hash_1.hashPassword)(password);
            switch (role) {
                case role_1.RoleEnum.CUSTOMER.toLowerCase(): {
                    const emailExist = await this._customerRepository.checkCustomerExist(email);
                    if (!emailExist) {
                        throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.CUSTOMER_NOT_FOUND, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
                    }
                    await this._customerRepository.resetPassword(email, hashedPassword);
                    return;
                }
                case role_1.RoleEnum.VENDOR.toLowerCase(): {
                    const emailExist = await this._vendorRepository.checkVendorExist(email);
                    if (!emailExist) {
                        throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.VENDOR_NOT_FOUND, httpStatusCodeEnum_1.StatusCodeEnum.NOT_FOUND);
                    }
                    await this._vendorRepository.resetPassword(email, hashedPassword);
                    return;
                }
                default:
                    logger_1.default.error(messagesEnum_1.MessageEnum.ROLE_NOT_FOUND, "in reset password");
            }
        };
        /***
         *
         *  updata access token
         *
         */
        this.updateAccessToken = async (token, role) => {
            let refreshToken;
            let entity;
            switch (role?.toLowerCase()) {
                case role_1.RoleEnum.CUSTOMER.toLowerCase():
                    refreshToken = token?.CustomerJwt;
                    entity = role_1.RoleEnum.CUSTOMER;
                    break;
                case role_1.RoleEnum.VENDOR.toLowerCase():
                    refreshToken = token?.VendorJwt;
                    entity = role_1.RoleEnum.VENDOR;
                    break;
                case role_1.RoleEnum.ADMIN.toLowerCase():
                    refreshToken = token?.AdminJwt;
                    entity = role_1.RoleEnum.ADMIN;
                    break;
                default:
                    throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.ROLE_NOT_FOUND, httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST);
            }
            if (!refreshToken) {
                logger_1.default.warning("Refresh token missing");
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.REFRESH_TOKEN_MISSING, httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST);
            }
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_KEY);
            }
            catch (error) {
                logger_1.default.error(`Token verification failed: ${error.message}`);
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.TOKEN_INVALID, httpStatusCodeEnum_1.StatusCodeEnum.UNAUTHORIZED);
            }
            if (!decoded?.userId) {
                throw new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.TOKEN_INVALID, httpStatusCodeEnum_1.StatusCodeEnum.UNAUTHORIZED);
            }
            const payload = {
                userId: decoded.userId,
                role: entity,
            };
            const newAccessToken = (0, jwt_1.accessToken)(payload);
            return newAccessToken;
        };
        this._customerRepository = customerRepository;
        this._vendorRepository = vendorRpository;
        this._adminRepository = adminRepository;
    }
}
exports.AuthService = AuthService;
