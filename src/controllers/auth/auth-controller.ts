// -----vendor
// login✅
// signup✅
// reset password✅
// refresh token✅
// logout✅
// -----customer
// login✅
// signup✅
// resetPassword✅
// logout✅
// refresh tokenk✅
// -----admin
// login✅
// logout✅
// refresh token✅





import { NextFunction, Request, response, Response } from "express";
import { AuthServiceInterface } from "../../interface/auth-interface/auth-serivce-interface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import logger from "../../utils/logger";

export class AuthController {
  private _authService: AuthServiceInterface;

  constructor(authService: AuthServiceInterface) {
    this._authService = authService;
  }

  /**
   * sign up
   */
  // ------------------------------------------------------  verify email
  verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = req.body;
      await this._authService.verifyEmail(data);
      res.status(StatusCodeEnum.OK).json(MessageEnum.REGISTER_SUCCESS);
    } catch (error: unknown) {
      next(error);
    }
  };

  // ------------------------------------------------------  add Entity
  addNewEntity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = req.body;
      let response = await this._authService.addNewEntity(data);
      if (response) {
        res
          .status(StatusCodeEnum.OK)
          .json(MessageEnum.ENTITY_ADDEDD_SUCCESSFULY);
      }
    } catch (error: unknown) {
      next(error);
    }
  };

  /**
   *  login
   */
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let data = req.body;
      let result = await this._authService.login(data);

      if (result) {
        res.cookie(`${result.role}Jwt`, result.refreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY),
        });
        res.status(StatusCodeEnum.OK).json({
          message: `${result.role} ${MessageEnum.LOGIN_SUCCESSFLLY}`,
          accesstoken: result.accessToken,
          ...(result.entityData && { data: result.entityData }),
        });
      }
    } catch (error: unknown) {
      console.log(error);

      next(error);
    }
  };

  /**
   *
   *  Restet passwrod
   *
   */
  // ------------------------------------------------------ verify resest password email
  resetPasswordEmailVerify = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let result = await this._authService.resetPasswordEmailVerify(req.body);
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.EMAIL_SEND_SUCCESS });
      }
    } catch (error: unknown) {
      next(error);
    }
  };

  // ------------------------------------------------------ reset password for verified email
  resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this._authService.resetPassword(req.body);
      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.PASSWROD_CAHNGE_SUCCESS });
    } catch (error: unknown) {
      next(error);
    }
  };

  /**
   *
   *  Refreah token
   *
   */

  // ------------------------------------------------------ update customer refresh token
  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let refreshToken = req.cookies;

      let accessToken = await this._authService.updateAccessToken(
        refreshToken,
        req.body.role
      );

      res.status(StatusCodeEnum.OK).json({ accessToken });
    } catch (error: unknown) {
      next(error);
    }
  };

  /***
   *
   *
   *  Logout
   *
   */

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let role = req.body.role;
      res.clearCookie(`${role}Jwt`, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.LOGOOUT_SUCCESS });
    } catch (error: unknown) {
      logger.error("error to logout entity");
      next(error);
    }
  };
}
