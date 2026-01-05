"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.accessToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN_KEY;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN_KEY;
if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}
if (!JWT_ACCESS_TOKEN) {
    throw new Error("JWT_ACCESS_TOKEN is not defined in environment variables");
}
if (!JWT_REFRESH_TOKEN) {
    throw new Error("JWT_REFRESH_TOKEN is not defined in environment variables");
}
// -- for signup
const generateJwtToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
};
exports.generateJwtToken = generateJwtToken;
const accessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_ACCESS_TOKEN, { expiresIn: "10m" });
};
exports.accessToken = accessToken;
const refreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_REFRESH_TOKEN, { expiresIn: "7d" });
};
exports.refreshToken = refreshToken;
