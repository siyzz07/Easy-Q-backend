import { NextFunction, Request, Response } from "express";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { promises } from "dns";
import { log } from "console";
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
      if (error instanceof Error) {
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json({ message: MessageEnum.SERVER_ERROR });
      }
    }
  };
}
