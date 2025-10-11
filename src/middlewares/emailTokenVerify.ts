import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { MessageEnum } from "../enums/messagesEnum";
import { StatusCodeEnum } from "../enums/httpStatusCodeEnum";

const JWT_SECRET_KEY: any = process.env.JWT_SECRET_KEY;

export const emailVerifyTokenMIddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, ...data } = req.body as {
      token: string;
      [key: string]: any;
    };

    if (!token) {
      throw new Error(MessageEnum.EMAIL_TOKEN_MISSING);
    }

    const decoded = Jwt.verify(token, JWT_SECRET_KEY);

    if (typeof decoded === "string") {
      throw new Error(MessageEnum.EMAIL_TOKEN_INVALID);
    }

    req.body = { ...data, ...decoded };
    next();
  } catch (error: any) {
    if (error.message == MessageEnum.EMAIL_TOKEN_MISSING) {
      res
        .status(StatusCodeEnum.BAD_REQUEST)
        .json(MessageEnum.EMAIL_TOKEN_MISSING);
    } else if (error.name === "TokenExpiredError") {
      console.log("Token is expired");
      res
        .status(StatusCodeEnum.BAD_REQUEST)
        .json(MessageEnum.EMAIL_TOKEN_EXPIRED);
    } else if (error.name === "JsonWebTokenError") {
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
