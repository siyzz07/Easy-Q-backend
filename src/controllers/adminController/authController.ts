import { NextFunction, Request, Response } from "express";
import { IAdminAuthServiceInterface } from "../../interface/serviceInterface/adminServiceInterface";
import { MessageEnum } from "../../enums/messagesEnum";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";

export class AdminAtuhController {
  private _atuhService: IAdminAuthServiceInterface;

  constructor(authService: IAdminAuthServiceInterface) {
    this._atuhService = authService;
  }


  /**
   * 
   * admin login
   * 
   */
  loginAdmin = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      const data = req.body;

      const response = await this._atuhService.loginAdmin(data);
      if (response) {
        res.cookie("AdminJwt", response.refreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY),
        });
        res.status(StatusCodeEnum.OK).json({
          message: MessageEnum.ADMIN_LOGIN_SUCCESS,
          accesstoken: response.accessToken,
        });
      }

    } catch (error) {
      next(error)
    }
  };

   /**
   * 
   * admin refresh token
   * 
   */
  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.AdminJwt;

      if (!refreshToken) {
        res
          .status(StatusCodeEnum.BAD_REQUEST)
          .json({ message: MessageEnum.TOKEN_REFRESH_MISSING });
        return;
      }

      const accessToken = await this._atuhService.updateToken(refreshToken);

      res.status(StatusCodeEnum.OK).json({ accessToken });
    } catch (error: any) {
      switch (error.message) {
        case "TOKEN_EXPIRED":
          res.status(401).json({ message: MessageEnum.TOKEN_EXPIRED });
          break;
        case "TOKEN_INVALID":
          res.status(401).json({ message: MessageEnum.TOKEN_INVALID });
          break;
        case "TOKEN_MISSING":
          res.status(400).json({ message: MessageEnum.TOKEN_MISSING });
          break;
        default:
          res.status(500).json({ message:MessageEnum.SERVER_ERROR });
      }
    }
  };

 /**
   * 
   * admin logout
   * 
   */

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("AdminJwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.LOGOOUT_SUCCESS });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
}
