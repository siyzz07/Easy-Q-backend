import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { MessageEnum } from "../enums/messagesEnum";


interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {

  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);

 


  const statusCode = err.statusCode || 500;
  const message = err.message || MessageEnum.SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message,
  });
};
