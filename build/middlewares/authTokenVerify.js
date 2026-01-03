"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVendorOrCustomer = exports.isAdmin = exports.isVendor = exports.isCustomer = exports.RoleAuth = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const httpStatusCodeEnum_1 = require("../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../enums/messagesEnum");
const role_1 = require("../enums/role");
/**
 *
 *  Token veriy
 *
 */
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_TOKEN_KEY);
        req.body = { ...req.body, userId: decoded.userId, role: decoded.role };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            if (error.name == "TokenExpiredError") {
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.UNAUTHORIZED)
                    .json({ message: messagesEnum_1.MessageEnum.TOKEN_EXPIRED });
            }
            else {
                res
                    .status(httpStatusCodeEnum_1.StatusCodeEnum.UNAUTHORIZED)
                    .json({ message: messagesEnum_1.MessageEnum.TOKEN_INVALID });
            }
        }
        else {
            console.log("auth Token verify error");
        }
    }
};
exports.verifyToken = verifyToken;
/**
 *
 *  role veriy
 *
 */
const RoleAuth = (...roles) => (req, res, next) => {
    const role = req.body.role;
    if (!role || !roles.includes(role)) {
        return res
            .status(httpStatusCodeEnum_1.StatusCodeEnum.FORBIDDEN)
            .json({ success: false, message: messagesEnum_1.MessageEnum.FORBIDDEN });
    }
    delete req.body.role;
    next();
};
exports.RoleAuth = RoleAuth;
exports.isCustomer = (0, exports.RoleAuth)(role_1.RoleEnum.CUSTOMER);
exports.isVendor = (0, exports.RoleAuth)(role_1.RoleEnum.VENDOR);
exports.isAdmin = (0, exports.RoleAuth)(role_1.RoleEnum.ADMIN);
exports.isVendorOrCustomer = (0, exports.RoleAuth)(role_1.RoleEnum.CUSTOMER, role_1.RoleEnum.VENDOR);
