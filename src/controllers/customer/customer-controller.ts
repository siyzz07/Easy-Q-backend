import { NextFunction, Request, Response } from "express";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { log } from "console";
import { ICustomerServiceInterface } from "../../interface/customer-interface/customer-service-interface";
import logger from "../../utils/logger";

export class CustomerController {
  private _customerService: ICustomerServiceInterface;

  constructor(customerservice: ICustomerServiceInterface) {
    this._customerService = customerservice;
  }

  //-------------------------------------get customer data
  getCustomerData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.body.userId;

      const response = await this._customerService.getCustomerData(id);
      if (response) {
        res.status(StatusCodeEnum.OK).json({
          message: MessageEnum.CUSTOMER_DATA_FETCH_SUCCESS,
          data: response,
        });
      }
    } catch (error: unknown) {
      next(error);
    }
  };

   //------------------------------------- upadte profile
  editProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: {
        name: string;
        email: string;
        phone: string;
        userId: string;
      } = req.body;

      const result = await this._customerService.editProfile(data);
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.CUSTOMER_PROFILE_UPDATED });
      }
    } catch (error: unknown) {
      next(error);
      logger.error('"error to update customer profile"');
    }
  };

   //-------------------------------------chage password in profile
  changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this._customerService.updatePasswordInProfile(
        req.body
      );
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.PASSWROD_CAHNGE_SUCCESS });
      }
    } catch (error: unknown) {
      next(error);
    }
  };

  //==================================================================

}
