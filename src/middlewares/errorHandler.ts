import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { MessageEnum } from "../enums/messagesEnum";
import { StatusCodeEnum } from "../enums/httpStatusCodeEnum";


interface CustomError extends Error {
  statusCode?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: CustomError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {

  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);

 


  const statusCode = err.statusCode || StatusCodeEnum.INTERNAL_SERVER_ERROR;
  const message = err.message || MessageEnum.SERVER_ERROR;
  console.log('statusCode', statusCode)
  console.log('message', message)
  
  res.status(statusCode).json({
    success: false,
    message,
  });
};
