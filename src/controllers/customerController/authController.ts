import { Request, Response } from "express";
import { ICustomerInterface } from "../../interface/serviceInterface/customerServiceInterface";
import { log } from "console";
import { runInNewContext } from "vm";
import { MessageEnum } from "../../enums/messagesEnum";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";

class CustomerAuth {
  private _authService: ICustomerInterface;

  constructor(authService: ICustomerInterface) {
    this._authService = authService;
  }

  addCustomer = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      const response = await this._authService.verifyEmail(data);

      res
        .status(StatusCodeEnum.OK)
        .json(MessageEnum.CUSTOMER_REGISTERED)
      
    } catch (error: any) {
      if (error.message == MessageEnum.CUSTOMER_ALREADY_EXISTS) {
        res
          .status(StatusCodeEnum.CONFLICT)
          .json(MessageEnum.CUSTOMER_ALREADY_EXISTS);
      }
    }
  };

  addVerifiedCustomer = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const response = await this._authService.addCustomer(data)

      if(response){
        res
          .status(StatusCodeEnum.OK)
          .json(MessageEnum.CUSTOMER_REGISTERED)
      }else{
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json(MessageEnum.EMAIL_VERIFY_SUCCESS)
      }
    } catch (error: any) {
      if (error.message == MessageEnum.CUSTOMER_ALREADY_EXISTS) {
        res
          .status(StatusCodeEnum.CONFLICT)
          .json(MessageEnum.CUSTOMER_ALREADY_EXISTS);
      }
    }
  };
}

export default CustomerAuth;
