import { NextFunction, Request, Response } from "express";
import Jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { StatusCodeEnum } from "../enums/httpStatusCodeEnum";
import { MessageEnum } from "../enums/messagesEnum";
import { RoleEnum } from "../enums/role";




/**
 * 
 *  Token veriy
 * 
 */
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


    req.body = { ...req.body, userId: decoded.userId ,role:decoded.role};

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



/**
 * 
 *  role veriy
 * 
 */

export const RoleAuth = 
(...roles : string[]) =>
(req:Request,res:Response,next:NextFunction)=>{
  const role = req.body.role

  if(!role || !roles.includes(role)){
    return res
              .status(StatusCodeEnum.FORBIDDEN)
              .json({success:false,message:MessageEnum.FORBIDDEN})
  }
  delete req.body.role
  next();
}

export const isCustomer = RoleAuth(RoleEnum.CUSTOMER)
export const isVendor = RoleAuth(RoleEnum.VENDOR)
export const isAdmin = RoleAuth(RoleEnum.ADMIN)
export const isVendorOrCustomer = RoleAuth(RoleEnum.CUSTOMER,RoleEnum.VENDOR)