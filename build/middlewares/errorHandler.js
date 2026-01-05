"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const messagesEnum_1 = require("../enums/messagesEnum");
const httpStatusCodeEnum_1 = require("../enums/httpStatusCodeEnum");
const errorHandler = (err, req, res, next) => {
    logger_1.default.error(`${err.message} - ${req.method} ${req.originalUrl}`);
    const statusCode = err.statusCode || httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR;
    const message = err.message || messagesEnum_1.MessageEnum.SERVER_ERROR;
    console.log('statusCode', statusCode);
    console.log('message', message);
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorHandler = errorHandler;
