"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editAddressSchema = exports.addAddressSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addAddressSchema = joi_1.default.object({
    address: joi_1.default.string()
        .trim()
        .pattern(/^[A-Za-z0-9\s,.-]+$/)
        .required()
        .messages({
        "string.empty": "Address is required",
        "string.pattern.base": "Invalid characters in address",
        "any.required": "Address is required",
    }),
    city: joi_1.default.string()
        .trim()
        .pattern(/^[A-Za-z\s]+$/)
        .required()
        .messages({
        "string.empty": "City is required",
        "string.pattern.base": "City can contain only letters",
        "any.required": "City is required",
    }),
    state: joi_1.default.string()
        .trim()
        .pattern(/^[A-Za-z\s]+$/)
        .required()
        .messages({
        "string.empty": "State is required",
        "string.pattern.base": "State can contain only letters",
        "any.required": "State is required",
    }),
    country: joi_1.default.string()
        .trim()
        .pattern(/^[A-Za-z\s]+$/)
        .required()
        .messages({
        "string.empty": "Country is required",
        "string.pattern.base": "Country can contain only letters",
        "any.required": "Country is required",
    }),
    phone: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required()
        .messages({
        "string.pattern.base": "Phone must be numbers only",
        "string.min": "Phone must be at least 10 digits",
        "string.max": "Phone can't exceed 15 digits",
        "any.required": "Phone is required",
    }),
    coordinates: joi_1.default.object({
        lat: joi_1.default.number()
            .required()
            .invalid(0)
            .messages({
            "number.base": "Latitude must be a number",
            "any.invalid": "Please select a valid location",
            "any.required": "Latitude required",
        }),
        lng: joi_1.default.number()
            .required()
            .invalid(0)
            .messages({
            "number.base": "Longitude must be a number",
            "any.invalid": "Please select a valid location",
            "any.required": "Longitude required",
        }),
    }).required(),
}).unknown(true);
;
exports.editAddressSchema = joi_1.default.object({
    address: joi_1.default.string()
        .trim()
        .pattern(/^[A-Za-z0-9\s,.-]+$/)
        .required()
        .messages({
        "string.empty": "Address is required",
        "string.pattern.base": "Invalid characters in address",
        "any.required": "Address is required",
    }),
    city: joi_1.default.string()
        .trim()
        .pattern(/^[A-Za-z\s]+$/)
        .required()
        .messages({
        "string.empty": "City is required",
        "string.pattern.base": "City can contain only letters",
        "any.required": "City is required",
    }),
    state: joi_1.default.string()
        .trim()
        .pattern(/^[A-Za-z\s]+$/)
        .required()
        .messages({
        "string.empty": "State is required",
        "string.pattern.base": "State can contain only letters",
        "any.required": "State is required",
    }),
    country: joi_1.default.string()
        .trim()
        .pattern(/^[A-Za-z\s]+$/)
        .required()
        .messages({
        "string.empty": "Country is required",
        "string.pattern.base": "Country can contain only letters",
        "any.required": "Country is required",
    }),
    phone: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required()
        .messages({
        "string.pattern.base": "Phone must be numbers only",
        "string.min": "Phone must be at least 10 digits",
        "string.max": "Phone can't exceed 15 digits",
        "any.required": "Phone is required",
    }),
}).unknown(true);
