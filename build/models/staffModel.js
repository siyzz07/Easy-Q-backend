"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const staffSchema = new mongoose_1.Schema({
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
    staffName: {
        type: String,
        required: true,
    },
    openingTime: {
        type: String,
        required: true,
    },
    closingTime: {
        type: String,
    },
    breaks: [
        {
            breakStartTime: String,
            breakEndTime: String,
        },
    ],
    isActive: {
        type: Boolean,
        default: true,
    },
    blockedDates: {
        type: [Date],
        default: [],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Staff", staffSchema);
