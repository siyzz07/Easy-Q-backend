import { NextFunction, Request, Response } from "express";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IAdminServiceInterface } from "../../interface/admin-interface/admin-service-interface";

export class AdminController {
  private _adminService: IAdminServiceInterface;

  constructor(adminService: IAdminServiceInterface) {
    this._adminService = adminService;
  }

  //----------------------------------------------------------admin dashboard
  dashboardData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this._adminService.dashboard();
      res.status(StatusCodeEnum.OK).json({
        totalCutomers: result.totalCutomers,
        totalVednors: result.totalVednors,
        pendingVendors: result.pendingVendors,
        verifiedVendors: result.verifiedVendors,
        rejectedVendors: result.rejectedVendors,
      });
    } catch (error: unknown) {
      next(error);
    }
  };

  //---------------------------------------------------------- Customer Management
  getCustomers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this._adminService.getCustomers();
      res.status(StatusCodeEnum.OK).json({
        message: MessageEnum.CUSTOMER_ALL_DATA_FETCH_SUCCESS,
        data: data,
      });
    } catch (error: unknown) {
      next(error);
    }
  };

  blockCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this._adminService.blockCustomer(req.body.id);
      res
        .status(StatusCodeEnum.OK)
        .json({ messeage: MessageEnum.CUSTOMER_DATA_UPDATION_SUCCESS });
    } catch (error: unknown) {
      next(error);
    }
  };

  //---------------------------------------------------------- Vendor Management
  getVendors = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this._adminService.getVendors();
      res.status(StatusCodeEnum.OK).json({
        message: MessageEnum.VENDOR__DATA_FETCH_SUCCESS,
        data: data,
      });
    } catch (error: unknown) {
      next(error);
    }
  };

  blockVendor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this._adminService.blockVendor(req.body.id);
      res
        .status(StatusCodeEnum.OK)
        .json({ messeage: MessageEnum.VENDOR_DATA_UPDATION_SUCCESS });
    } catch (error: unknown) {
      next(error);
    }
  };

  getVendorsRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this._adminService.getPendingVendors();
      res.status(StatusCodeEnum.OK).json({
        message: MessageEnum.VENDOR__DATA_FETCH_SUCCESS,
        data: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  };

  acceptVendorRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this._adminService.verifyVendor(req.body.id);
      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.VENDOR_VRIFIED });
    } catch (error: unknown) {
      next(error);
    }
  };

  rejectVendorRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this._adminService.rejectVendor(req.body.id);
      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.VENDOR_DENIED });
    } catch (error: unknown) {
      next(error);
    }
  };
}
