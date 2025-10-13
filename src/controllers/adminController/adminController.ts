import { Request, Response } from "express";
import { IAdminServiceInterface } from "../../interface/serviceInterface/adminServiceInterface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class AdminController {
  private _adminService: IAdminServiceInterface;

  constructor(adminService: IAdminServiceInterface) {
    this._adminService = adminService;
  }

  //---------------------------------------------------------- get all customer data
  getUserDatas = async (req: Request, res: Response): Promise<void> => {
    try {
      let data = await this._adminService.getCustomersDatas();

      res.status(StatusCodeEnum.OK).json({
        message: MessageEnum.CUSTOMER_ALL_DATA_FETCH_SUCCESS,
        data: data,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json({ message: MessageEnum.SERVER_ERROR });
      }

      console.log(error);
    }
  };

  //----------------------------------------------------------block customer

  blockCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
      await this._adminService.blockCustomer(req.body.id);

      res
        .status(StatusCodeEnum.OK)
        .json({ messeage: MessageEnum.CUSTOMER_DATA_UPDATION_SUCCESS });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  //----------------------------------------------------------get vendors data
  geVendorsDatas = async (req: Request, res: Response): Promise<void> => {
    try {
      let data = await this._adminService.getVendorsDatas();
      res.status(StatusCodeEnum.OK).json({
        message: MessageEnum.VENDOR__DATA_FETCH_SUCCESS,
        data: data,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json({ message: MessageEnum.SERVER_ERROR });
      }

      console.log(error);
    }
  };
  //----------------------------------------------------------block vendor
  blockVendor = async (req: Request, res: Response): Promise<void> => {
    try {
      await this._adminService.blockVendor(req.body.id);

      res
        .status(StatusCodeEnum.OK)
        .json({ messeage: MessageEnum.VENDOR_DATA_UPDATION_SUCCESS });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
}
