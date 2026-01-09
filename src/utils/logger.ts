import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    // Console logs
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),

    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: process.env.LOGGER_RETENTION_MAXFILES,     
      maxSize: process.env.LOGGER_RETENTION_MAXSIZE,    
      format: format.uncolorize(),
    }),

   
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles:process.env.LOGGER_RETENTION_MAXFILES,    
      maxSize: process.env.LOGGER_RETENTION_MAXSIZE,
      format: format.uncolorize(),
    }),
  ],
});

export default logger;
