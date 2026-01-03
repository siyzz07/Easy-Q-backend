"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCloudinaryImage = void 0;
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
const deleteCloudinaryImage = async (public_id) => {
    try {
        if (!public_id)
            return false;
        const result = await cloudinaryConfig_1.default.uploader.destroy(public_id);
        if (result.result == "ok") {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
};
exports.deleteCloudinaryImage = deleteCloudinaryImage;
