"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const notificationSchema = new mongoose_1.Schema({
    recipient: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        refPath: "recipientType",
    },
    recipientType: {
        type: String,
        enum: ["Customer", "Vendor"],
        required: true,
    },
    category: {
        type: String,
        enum: ["booking", "contract", "message", "system", "payment"],
        default: "system",
    },
    type: {
        type: String,
        enum: [
            "new_booking",
            "booking_cancelled",
            "booking_completed",
            "contract_applyied",
            "contract_signed",
            "message",
            "system",
            "payment_success",
            "payment_failed",
        ],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    metaData: {
        booking: {
            id: String,
            date: String,
            time: String,
        },
        contract: {
            id: String,
            name: String,
        },
        message: {
            chatId: String,
            senderId: String,
        },
        payment: {
            amount: Number,
            method: String,
            transactionId: String,
        },
        extra: {
            type: Object,
            default: {},
        },
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Notification", notificationSchema);
