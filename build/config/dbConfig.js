"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const dbConfig = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL || "";
        await mongoose_1.default.connect(MONGODB_URL);
        console.log("database connected ...");
    }
    catch (error) {
        if (error instanceof mongoose_2.Error) {
            console.log(`error to connect DB ${error.message}`);
        }
        else {
            console.log(`db connection error ${error}`);
        }
    }
};
exports.default = dbConfig;
