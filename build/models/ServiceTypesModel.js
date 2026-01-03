"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ServiceTypeSchema = new mongoose_1.Schema({
    serviceName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
    },
});
exports.default = (0, mongoose_1.model)('ServiceTypes', ServiceTypeSchema);
