// // src/utils/logger.ts
// import { createLogger, format, transports } from "winston";

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
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize({ all: true }), 
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), 
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: format.uncolorize() 
    }),
    new transports.File({
      filename: "logs/combined.log",
      format: format.uncolorize()
    }),
  ],
});

export default logger;
