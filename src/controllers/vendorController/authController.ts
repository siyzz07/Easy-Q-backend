import { Request, response, Response } from "express";
import { IVendorInterface } from "../../interface/serviceInterface/vendorServiceInterface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class AuthController {
  private _authService: IVendorInterface;

  constructor(authSrevice: IVendorInterface) {
    this._authService = authSrevice;
  }

  verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      let response = await this._authService.verifyEmail(data);

      res.status(StatusCodeEnum.OK).json(MessageEnum.VENDOR_REGISTERED);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.VENDOR_EXISTS) {
          res
            .status(StatusCodeEnum.UNAUTHORIZED)
            .json(MessageEnum.VENDOR_EXISTS);
        } else {
        }
      } else {
        console.log("internal error");
      }
    }
  };

  addNewVendor = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;

      await this._authService.addNewVendor(data);

      res.status(StatusCodeEnum.OK).json(MessageEnum.VENDOR_CREATED);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.VENDOR_EXISTS) {
          res
            .status(StatusCodeEnum.UNAUTHORIZED)
            .json(MessageEnum.VENDOR_EXISTS);
        } else {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json("server error please try again");
        }
      } else {
        console.log("add new vendor controller error ");
      }
    }
  };

  //---------------vendor login ------------------------

  login = async (req: Request, res: Response) => {
    try {
      let data = req.body;
      const response: any = await this._authService.vendorLogin(data);

      res.cookie("VendorJwt", response.refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(StatusCodeEnum.OK).json({
        message: MessageEnum.LOGIN_SUCCESS,
        accesstoken: response.accessToken,
        data: response.vendorData,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === MessageEnum.VENDOR_NOT_FOUND) {
          res
            .status(StatusCodeEnum.NOT_FOUND)
            .json(MessageEnum.VENDOR_NOT_FOUND);
        } else if (error.message === MessageEnum.INVALID_CREDENTIALS) {
          res
            .status(StatusCodeEnum.UNAUTHORIZED)
            .json(MessageEnum.INVALID_CREDENTIALS);
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
        res.status(400).json({ message: "Refresh token missing" });
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
          res.status(500).json({ message: "server error" });
      }
    }
  };

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
}
