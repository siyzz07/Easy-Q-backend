import { Request, Response } from "express";
import { IAdminServiceInterface } from "../../interface/serviceInterface/adminServiceInterface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { promises } from "dns";
import { log } from "console";

export class AdminController {
  private _adminService: IAdminServiceInterface;

  constructor(adminService: IAdminServiceInterface) {
    this._adminService = adminService;
  }

  //---------------------------------------------------------- get all customer data
  getUserDatas = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this._adminService.getCustomersDatas();

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
      const data = await this._adminService.getVendorsDatas();
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
  //----------------------------------------------------------get vendors request for approvel
  getVendorsRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._adminService.getVendorsVerification();
      res.status(StatusCodeEnum.OK).json({
        message: MessageEnum.VENDOR__DATA_FETCH_SUCCESS,
        data: result,
      });
    } catch (error: unknown) {}
  };

  //----------------------------------------------------------reject the vendor requst
  rejectVendorRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._adminService.rejectVendorRequst(req.body.id);
      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.VENDOR_DENIED });
    } catch (error: unknown) {}
  };

  //----------------------------------------------------------Accept the vendor requst
  acceptVendorRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._adminService.verifyVendorRequst(req.body.id);
      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.VENDOR_VRIFIED });
    } catch (error: unknown) {}
  };

  //----------------------------------------------------------admin dashboard
  dashboardData = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._adminService.dashboard();
      res
        .status(StatusCodeEnum.OK)
        .json({
          totalCutomers: result.totalCutomers,
          totalVednors: result.totalVednors,
          pendingVendors: result.pendingVendors,
          verifiedVendors: result.verifiedVendors,
          rejectedVendors: result.rejectedVendors,
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json({ message: MessageEnum.SERVER_ERROR });
      }
    }
  };
}
