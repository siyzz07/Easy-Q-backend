"use strict";
// // src/utils/logger.ts
// import { createLogger, format, transports } from "winston";
Object.defineProperty(exports, "__esModule", { value: true });
// const logger = createLogger({
//   level: "info", 
//   format: format.combine(
//     format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//     format.printf(({ timestamp, level, message }) => {
//       return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
//     })
//   ),
//   transports: [
//     new transports.Console(), 
//     new transports.File({ filename: "logs/error.log", level: "error" }),
//     new transports.File({ filename: "logs/combined.log" }),
//   ],
// });
// export default logger;
// src/utils/logger.ts
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.colorize({ all: true }), winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
    })),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: winston_1.format.uncolorize()
        }),
        new winston_1.transports.File({
            filename: "logs/combined.log",
            format: winston_1.format.uncolorize()
        }),
    ],
});
exports.default = logger;
