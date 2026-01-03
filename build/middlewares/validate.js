"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const validate = (schema) => (req, res, next) => {
    const validations = [
        schema.body?.validate(req.body, { abortEarly: false }),
        schema.params?.validate(req.params, { abortEarly: false }),
        schema.query?.validate(req.query, { abortEarly: false }),
    ];
    const errors = validations
        .filter((result) => Boolean(result?.error))
        .flatMap(({ error }) => error.details.map((detail) => detail.message));
    if (errors.length > 0) {
        logger_1.default.error('backend  validation error');
        logger_1.default.warn(`${errors}`);
        return res.status(400).json({
            message: "Validation failed",
            errors,
        });
    }
    next();
};
exports.validate = validate;
