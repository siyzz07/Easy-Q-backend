import { NextFunction, Request, Response } from "express";
import Jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { StatusCodeEnum } from "../enums/httpStatusCodeEnum";
import { MessageEnum } from "../enums/messagesEnum";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  try {
    const decoded = Jwt.verify(
      token as string,
      process.env.JWT_ACCESS_TOKEN_KEY!
    ) as JwtPayload;

    req.body = { ...req.body, userId: decoded.userId };

    next();
  } catch (error: unknown) {
    if (error instanceof JsonWebTokenError) {
      if (error.name == "TokenExpiredError") {
        res
          .status(StatusCodeEnum.UNAUTHORIZED)
          .json({ message: MessageEnum.TOKEN_EXPIRED });
      } else {
        res
          .status(StatusCodeEnum.UNAUTHORIZED)
          .json({ message: MessageEnum.TOKEN_INVALID });
      }
    } else {
      console.log("auth Token verify error");
    }
  }
};
