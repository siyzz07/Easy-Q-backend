"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSignupValidationSchema = exports.vendorSignupValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.vendorSignupValidationSchema = {
    body: joi_1.default.object({
        shopName: joi_1.default.string()
            .required()
            .min(3)
            .pattern(/^[A-Za-z0-9 ]+$/)
            .messages({
            "any.required": "Shop name is required",
            "string.min": "Shop name must be at least 3 characters",
            "string.pattern.base": "Shop name can only contain letters, numbers, and spaces",
        }),
        email: joi_1.default.string()
            .trim()
            .email()
            .required()
            .messages({
            "string.email": "Invalid email format",
            "any.required": "Email is required",
        }),
        phone: joi_1.default.string()
            .required()
            .pattern(/^[0-9]{10}$/)
            .messages({
            "any.required": "Phone number is required",
            "string.pattern.base": "Phone number must be exactly 10 digits",
        }),
        password: joi_1.default.string()
            .required()
            .min(6)
            .pattern(/[A-Z]/)
            .pattern(/[a-z]/)
            .pattern(/[0-9]/)
            .messages({
            "any.required": "Password is required",
            "string.min": "Password must be at least 6 characters",
            "string.pattern.base": "Password must contain uppercase, lowercase, and number",
        }),
        confirmPassword: joi_1.default.string()
            .required()
            .valid(joi_1.default.ref("password"))
            .messages({
            "any.required": "Confirm Password is required",
            "any.only": "Passwords must match",
        }),
    }),
};
exports.customerSignupValidationSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string()
            .required()
            .min(3)
            .pattern(/^[A-Za-z0-9 ]+$/)
            .custom((value, helpers) => {
            // not only spaces
            if (value.trim().length === 0) {
                return helpers.error("string.onlySpaces");
            }
            // not repeated characters
            if (/^([A-Za-z0-9 ])\1+$/.test(value)) {
                return helpers.error("string.repeated");
            }
            return value;
        })
            .messages({
            "any.required": "Name is required",
            "string.min": "Name must be at least 3 characters",
            "string.pattern.base": "Name can only contain letters, numbers, and spaces",
            "string.onlySpaces": "Name cannot be just spaces",
            "string.repeated": "Name cannot be the same character repeated",
        }),
        email: joi_1.default.string()
            .email()
            .required()
            .messages({
            "string.email": "Invalid email address",
            "any.required": "Email is required",
        }),
        phone: joi_1.default.string()
            .required()
            .pattern(/^[6-9][0-9]{9,14}$/)
            .messages({
            "any.required": "Phone number is required",
            "string.pattern.base": "Phone number is not valid",
        }),
        password: joi_1.default.string()
            .required()
            .min(6)
            .pattern(/[A-Z]/)
            .pattern(/[a-z]/)
            .pattern(/[0-9]/)
            .custom((value, helpers) => {
            if (/^([a-zA-Z0-9@$!%*?&])\1*$/.test(value)) {
                return helpers.error("string.repeated");
            }
            return value;
        })
            .messages({
            "any.required": "Password is required",
            "string.min": "Password must be at least 6 characters",
            "string.pattern.base": "Password must contain uppercase, lowercase, and number",
            "string.repeated": "Password cannot be the same character repeated",
        }),
    }),
};
