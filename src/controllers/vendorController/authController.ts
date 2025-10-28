import { Request, Response } from "express";
import { IVendorInterface } from "../../interface/serviceInterface/vendorServiceInterface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class AuthController {
  private _authService: IVendorInterface;

  constructor(authSrevice: IVendorInterface) {
    this._authService = authSrevice;
  }

  //-------------------------------------------------------------------verify the registered users by mail
  verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      await this._authService.verifyEmail(data);

      res.status(StatusCodeEnum.OK).json(MessageEnum.VENDOR_REGISTERED);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.VENDOR_EXISTS) {
          res.status(StatusCodeEnum.CONFLICT).json(MessageEnum.VENDOR_EXISTS);
        } else {
          console.log("error to verify email", error);
        }
      } else {
        console.log(MessageEnum.SERVER_ERROR);
      }
    }
  };

  //-------------------------------------------------------------------add new verified vendor
  addNewVendor = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;

      await this._authService.addNewVendor(data);
      res.status(StatusCodeEnum.OK).json(MessageEnum.VENDOR_CREATED);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.VENDOR_EXISTS) {
          res.status(StatusCodeEnum.CONFLICT).json(MessageEnum.VENDOR_EXISTS);
        } else {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json(MessageEnum.SERVER_ERROR);
        }
      } else {
        console.log("add new vendor controller error ");
      }
    }
  };

  //---------------vendor login ------------------------

  login = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const response: any = await this._authService.vendorLogin(data);

      res.cookie("VendorJwt", response.refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY),
      });

      res.status(StatusCodeEnum.OK).json({
        message: MessageEnum.LOGIN_SUCCESS,
        accesstoken: response.accessToken,
        data: response.vendorData,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === MessageEnum.VENDOR_NOT_FOUND) {
          res
            .status(StatusCodeEnum.NOT_FOUND)
            .json(MessageEnum.VENDOR_NOT_FOUND);
        } else if (error.message === MessageEnum.INVALID_CREDENTIALS) {
          res
            .status(StatusCodeEnum.NOT_FOUND)
            .json(MessageEnum.INVALID_CREDENTIALS);
        } else if (error.message === MessageEnum.VENDOR_BLOCKED) {
          res.status(StatusCodeEnum.NOT_FOUND).json(MessageEnum.VENDOR_BLOCKED);
        } else if (error.message == MessageEnum.VENDOR_UNDER_VERIFICATION) {
          res
            .status(StatusCodeEnum.BAD_REQUEST)
            .json(MessageEnum.VENDOR_UNDER_VERIFICATION);
        } else if (error.message == MessageEnum.VENDOR_VERIFICATION_REJECTED) {
          res
            .status(StatusCodeEnum.BAD_REQUEST)
            .json(MessageEnum.VENDOR_VERIFICATION_REJECTED);
        } else {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json(MessageEnum.SERVER_ERROR);
        }
      } else {
        console.log("error unknown , vendor login error");
      }
    }
  };

  //----------------------- refresh token -----------------------

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.VendorJwt;

      if (!refreshToken) {
        res
          .status(StatusCodeEnum.BAD_REQUEST)
          .json({ message: MessageEnum.TOKEN_REFRESH_MISSING });
        return;
      }

      const accessToken = await this._authService.updateToken(refreshToken);

      res.status(200).json({ accessToken });
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
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json({ message: MessageEnum.SERVER_ERROR });
      }
    }
  };

  //------------------------ logout vendor --------------------------
  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("VendorJwt", {
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

  //------------------------------ verify email  for reset passowrd ---------------------
  resestPasswordEmailVerify = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      await this._authService.resetPasswordEmailVerify(req.body.email);
      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.EMAIL_SEND_SUCCESS });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === MessageEnum.VENDOR_NOT_FOUND) {
          res
            .status(StatusCodeEnum.NOT_FOUND)
            .json({ message: MessageEnum.VENDOR_NOT_FOUND });
        } else {
          console.log(error.message);
        }
      }
    }
  };

  //------------------------------------- reset password -----------------------
  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password }: { email: string; password: string } = req.body;

      await this._authService.resetPassowrd({ email, password });

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.PASSWROD_CAHNGE_SUCCESS });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === MessageEnum.VENDOR_NOT_FOUND) {
          res
            .status(StatusCodeEnum.NOT_FOUND)
            .json({ message: MessageEnum.VENDOR_NOT_FOUND });
        } else {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json(MessageEnum.SERVER_ERROR);
        }
      }
    }
  };
}
