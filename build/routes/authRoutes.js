"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authDi_1 = require("../di/authDi");
const emailTokenVerify_1 = require("../middlewares/emailTokenVerify");
const authTokenVerify_1 = require("../middlewares/authTokenVerify");
const authRoute = express_1.default.Router();
authRoute.post('/add-customer', emailTokenVerify_1.emailVerifyTokenMIddleware, authDi_1.authControllerInstance.addNewEntity);
authRoute.post('/add-vendor', emailTokenVerify_1.emailVerifyTokenMIddleware, authDi_1.authControllerInstance.addNewEntity);
authRoute.post('/verify-email', authDi_1.authControllerInstance.verifyEmail);
authRoute.post('/login', authDi_1.authControllerInstance.login);
authRoute.post('/reset-password/verify', authDi_1.authControllerInstance.resetPasswordEmailVerify);
authRoute.post('/reset-password', emailTokenVerify_1.emailVerifyTokenMIddleware, authDi_1.authControllerInstance.resetPassword);
authRoute.post('/refresh-token', authDi_1.authControllerInstance.refreshToken);
authRoute.post('/logout', authTokenVerify_1.verifyToken, authDi_1.authControllerInstance.logout);
exports.default = authRoute;
/*
 *
 * Auth A
 *
 */
// authRoute.post("/auth/login",authControllerInstance.login);
// authRoute.post("/auth/refresh-token", authControllerInstance.refreshToken);
// authRoute.post("/logout",authControllerInstance.logout);
/**
 *
 *  Auth C
 *
 */
//---
// authRoute.post('/auth/verify-email',authControllerInstance.verifyEmail)
// authRoute.post('/auth/login',authControllerInstance.login )
// authRoute.post('/reset-password/verify',authControllerInstance.resetPasswordEmailVerify)
// authRoute.post('/reset-password',emailVerifyTokenMIddleware,authControllerInstance.resetPassword)
// authRoute.post('/auth/refresh-token',authControllerInstance.refreshToken)
// authRoute.post ('/logout',verifyToken,authControllerInstance.logout)
// V
