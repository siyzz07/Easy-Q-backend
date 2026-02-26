import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { MessageEnum } from "../enums/messagesEnum";
import { StatusCodeEnum } from "../enums/httpStatusCodeEnum";

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY as string;

export const emailVerifyTokenMIddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { token, ...data } = req.body as {
      token: string;
      [key: string]: unknown;
    };

    if (!token) {
      throw new Error(MessageEnum.EMAIL_TOKEN_MISSING);
    }

    const decoded = Jwt.verify(token, JWT_SECRET_KEY);

    
    if (typeof decoded === "string") {
      throw new Error(MessageEnum.EMAIL_TOKEN_INVALID);
    }

    const { iat: _iat, exp: _exp, ...decodedData } = decoded


    
    req.body = { ...data, ...decodedData };
    console.log(_iat?"ii":'pp',_exp?"ii":'pp')
    next();
  } catch (error: unknown) { 
    const err = error as Error;
    if (err.message == MessageEnum.EMAIL_TOKEN_MISSING) {
      console.log("8");
      res
        .status(StatusCodeEnum.BAD_REQUEST)
        .json(MessageEnum.EMAIL_TOKEN_MISSING);
    } else if (err.name === "TokenExpiredError") {
      console.log("Token is expired");
      res
        .status(StatusCodeEnum.BAD_REQUEST)
        .json(MessageEnum.EMAIL_TOKEN_EXPIRED);
    } else if (err.name === "JsonWebTokenError") {
      console.log("Token is invalid");
      res
        .status(StatusCodeEnum.BAD_REQUEST)
        .json(MessageEnum.EMAIL_TOKEN_INVALID);
    } else {
      res
        .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
        .json(MessageEnum.EMAIL_SERVER_ERROR);
      console.log("Some other error:", error);
    }
  }
};
