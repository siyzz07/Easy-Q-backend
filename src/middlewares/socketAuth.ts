import Jwt, {  JwtPayload } from "jsonwebtoken";
import { Socket, ExtendedError } from "socket.io";
import logger from "../utils/logger";
import { ErrorResponse } from "../utils/errorResponse";
import { MessageEnum } from "../enums/messagesEnum";
import { StatusCodeEnum } from "../enums/httpStatusCodeEnum";

export const socketAuth = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  try {
    console.log('1');
    
    const token = socket.handshake.auth?.token;
    console.log('2');
    
    if (!token) {
      console.log('3');
      return next(
        new ErrorResponse(
          MessageEnum.UNAUTHORIZED,
          StatusCodeEnum.BAD_REQUEST
        ) as unknown as ExtendedError
      );
    }
    const decoded = Jwt.verify(
          token as string,
          process.env.JWT_ACCESS_TOKEN_KEY!
        ) as JwtPayload;

    socket.data.userId = decoded.userId;
    next(); 
  } catch (err) {
    logger.error("Socket authentication error:", err);


    next(
      new ErrorResponse(
        "socket authentication failed",
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      ) as unknown as ExtendedError
    );
  }
};
