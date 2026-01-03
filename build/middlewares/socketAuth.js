"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../utils/logger"));
const errorResponse_1 = require("../utils/errorResponse");
const messagesEnum_1 = require("../enums/messagesEnum");
const httpStatusCodeEnum_1 = require("../enums/httpStatusCodeEnum");
const socketAuth = (socket, next) => {
    try {
        const token = socket.handshake.auth?.token;
        if (!token) {
            return next(new errorResponse_1.ErrorResponse(messagesEnum_1.MessageEnum.UNAUTHORIZED, httpStatusCodeEnum_1.StatusCodeEnum.BAD_REQUEST));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_TOKEN_KEY);
        socket.data.userId = decoded.userId;
        next();
    }
    catch (err) {
        logger_1.default.error("Socket authentication error:", err);
        next(new errorResponse_1.ErrorResponse("socket authentication failed", httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR));
    }
};
exports.socketAuth = socketAuth;
