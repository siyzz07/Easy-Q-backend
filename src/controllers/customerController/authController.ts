import { Request, Response } from "express";
import { ICustomerInterface } from "../../interface/serviceInterface/customerServiceInterface";
import { MessageEnum } from "../../enums/messagesEnum";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";

class CustomerAuth {
  private _authService: ICustomerInterface;

  constructor(authService: ICustomerInterface) {
    this._authService = authService;
  }

  // -----------------------------------------------------------new cusotmer add - verify email
  addCustomer = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      await this._authService.verifyEmail(data);

      res.status(StatusCodeEnum.OK).json(MessageEnum.CUSTOMER_REGISTERED);
    } catch (error: any) {
      if (error.message == MessageEnum.CUSTOMER_ALREADY_EXISTS) {
        res
          .status(StatusCodeEnum.CONFLICT)
          .json(MessageEnum.CUSTOMER_ALREADY_EXISTS);
      }
    }
  };

  // ----------------------------------------------------------- add new verified customer
  addVerifiedCustomer = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const response = await this._authService.addCustomer(data);

      if (response) {
        res.status(StatusCodeEnum.OK).json(MessageEnum.CUSTOMER_REGISTERED);
      } else {
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json(MessageEnum.EMAIL_VERIFY_SUCCESS);
      }
    } catch (error: any) {
      if (error.message == MessageEnum.CUSTOMER_ALREADY_EXISTS) {
        res
          .status(StatusCodeEnum.CONFLICT)
          .json(MessageEnum.CUSTOMER_ALREADY_EXISTS);
      }
    }
  };

  // ----------------------------------------------------------- login cusomer
  customerLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;

      const response = await this._authService.customerLoginService(data);

      if (response) {
        res.cookie("CustomerJwt", response.refreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY),
        });
        res.status(StatusCodeEnum.OK).json({
          message: MessageEnum.CUSTOMER_LOGIN_SUCCESS,
          accesstoken: response.accessToken,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.CUSTOMER_NOT_FOUND) {
          res
            .status(StatusCodeEnum.NOT_FOUND)
            .json(MessageEnum.CUSTOMER_NOT_FOUND);
        } else if (error.message === MessageEnum.INVALID_CREDENTIALS) {
          res
            .status(StatusCodeEnum.BAD_REQUEST)
            .json(MessageEnum.INVALID_CREDENTIALS);
        } else if (error.message === MessageEnum.CUSTOMER_BLOCKED) {
          res
            .status(StatusCodeEnum.BAD_REQUEST)
            .json(MessageEnum.CUSTOMER_BLOCKED);
        } else {
          console.log("customer login Error", error.message);
        }
      } else {
        console.log("customer login errror ", error);
      }
    }
  };

  // -----------------------------------------------------------logout
  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("CustomerJwt", {
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

  //---------------------------------------------------------------------------update customer refresh token
  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.CustomerJwt;
      console.log("refresh token created");

      if (!refreshToken) {
        console.log("refresh token missing");

        res.status(400).json({ message: "Refresh token missing" });
        return;
      }

      const accessToken = await this._authService.updateToken(refreshToken);

      res.status(200).json({ accessToken });
    } catch (error: any) {
      switch (error.message) {
        case "TOKEN_EXPIRED":
          console.log("token exired");

          res.status(401).json({ message: MessageEnum.TOKEN_EXPIRED });
          break;
        case "TOKEN_INVALID":
          console.log("token invalied");
          res.status(401).json({ message: MessageEnum.TOKEN_INVALID });
          break;
        case "TOKEN_MISSING":
          console.log("token missing");
          res.status(400).json({ message: MessageEnum.TOKEN_MISSING });
          break;
        default:
          res.status(500).json({ message: "server error" });
      }
    }
  };

  //------------------------------ reset passwor - verify customer ------------

  resetPasswrodVerifyMail = async (
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
        if (error.message === MessageEnum.CUSTOMER_NOT_FOUND) {
          res
            .status(StatusCodeEnum.NOT_FOUND)
            .json({ message: MessageEnum.CUSTOMER_NOT_FOUND });
        } else {
          console.log(error.message);
        }
      }
    }
  };

  // ---------------------------------------------- reset passowrd
  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password }: { email: string; password: string } = req.body;

      await this._authService.resetPassowrd({ email, password });

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.PASSWROD_CAHNGE_SUCCESS });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === MessageEnum.CUSTOMER_NOT_FOUND) {
          res
            .status(StatusCodeEnum.NOT_FOUND)
            .json({ message: MessageEnum.CUSTOMER_NOT_FOUND });
        } else {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json(MessageEnum.SERVER_ERROR);
        }
      }
    }
  };
}

export default CustomerAuth;
