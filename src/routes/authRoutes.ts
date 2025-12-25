

import express from 'express'


import { authControllerInstance } from "../di/authDi";

import { emailVerifyTokenMIddleware } from '../middlewares/emailTokenVerify'
import { verifyToken } from '../middlewares/authTokenVerify'




const authRoute = express.Router()





authRoute.post('/add-customer',emailVerifyTokenMIddleware,authControllerInstance.addNewEntity)


authRoute.post('/add-vendor',emailVerifyTokenMIddleware,authControllerInstance.addNewEntity)

authRoute.post('/verify-email',authControllerInstance.verifyEmail)
authRoute.post('/login',authControllerInstance.login)
authRoute.post('/reset-password/verify',authControllerInstance.resetPasswordEmailVerify)
authRoute.post('/reset-password',emailVerifyTokenMIddleware,authControllerInstance.resetPassword)
authRoute.post('/refresh-token',authControllerInstance.refreshToken)
authRoute.post('/logout',verifyToken,authControllerInstance.logout)

export default authRoute





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