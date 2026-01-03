"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerifyTokenMIddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messagesEnum_1 = require("../enums/messagesEnum");
const httpStatusCodeEnum_1 = require("../enums/httpStatusCodeEnum");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const emailVerifyTokenMIddleware = (req, res, next) => {
    try {
        const { token, ...data } = req.body;
        if (!token) {
            throw new Error(messagesEnum_1.MessageEnum.EMAIL_TOKEN_MISSING);
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        if (typeof decoded === "string") {
            throw new Error(messagesEnum_1.MessageEnum.EMAIL_TOKEN_INVALID);
        }
        const { iat, exp, ...decodedData } = decoded;
        req.body = { ...data, ...decodedData };
        next();
    }
    catch (error) {
        if (error.message == messagesEnum_1.MessageEnum.EMAIL_TOKEN_MISSING) {
            console.log("8");
            res
                .status(httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST)
                .json(messagesEnum_1.MessageEnum.EMAIL_TOKEN_MISSING);
        }
        else if (error.name === "TokenExpiredError") {
            console.log("Token is expired");
            res
                .status(httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST)
                .json(messagesEnum_1.MessageEnum.EMAIL_TOKEN_EXPIRED);
        }
        else if (error.name === "JsonWebTokenError") {
            console.log("Token is invalid");
            res
                .status(httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST)
                .json(messagesEnum_1.MessageEnum.EMAIL_TOKEN_INVALID);
        }
        else {
            res
                .status(httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR)
                .json(messagesEnum_1.MessageEnum.EMAIL_SERVER_ERROR);
            console.log("Some other error:", error);
        }
    }
};
exports.emailVerifyTokenMIddleware = emailVerifyTokenMIddleware;
