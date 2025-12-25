import { NextFunction, Request, Response } from "express";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IVendorShopServiceInterface } from "../../interface/vendor-interface/vendor-service-interface";
import { workerData } from "worker_threads";

class VendorController {
  private _vendorShopService: IVendorShopServiceInterface;

  constructor(vendorService: IVendorShopServiceInterface) {
    this._vendorShopService = vendorService;
  }

  //---------------------------------------- add shop data (state ,city , location ,woring days ....)
  addShopData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId, latitude, longitude, workingDays, ...data } = {
        ...req.body,
      };
      const cordinates = {
        lat: latitude,
        lon: longitude,
      };

      await this._vendorShopService.addShopData(
        data,
        userId,
        cordinates,
        workingDays
      );

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.SHOP_DATA_ADDED_SUCCESS });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.SHOP_DATA_ADDED_FAILED) {
          res
            .status(StatusCodeEnum.FORBIDDEN)
            .json({ message: MessageEnum.SHOP_DATA_ADDED_FAILED });
        } else {
          res.status(StatusCodeEnum.FORBIDDEN).json({ message: error.message });
        }
      } else {
        console.log("shop data adding error");
      }
    }
  };

  //-----------------------------------------------------------------------get the shop data
  getShopData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.body.userId;

      const data = await this._vendorShopService.getShopData(id);
      res.status(StatusCodeEnum.OK).json({ data: data });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  //----------------------------------------------------------------------- get the shop service type
  //----------------------------------------------------------------------- get the shop service type
  //----------------------------------------------------------------------- get the shop service type
  //----------------------------------------------------------------------- get the shop service type
  //----------------------------------------------------------------------- get the shop service type
  //----------------------------------------------------------------------- get the shop service type
  //----------------------------------------------------------------------- get the shop service type
  getShopServiceType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this._vendorShopService.getShopTypes();

      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.SERVICE_FETCH_SUCCESS, data: result });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  //----------------------------------------------------------------------- update vendor
  updateVendor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId, workingDays, ...data } = { ...req.body };
      console.log(req.body);

      let result = await this._vendorShopService.updateVendor(
        userId,
        workingDays,
        data
      );
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.VENDOR_DATA_UPDATION_SUCCESS });
      }
    } catch (error: unknown) {
      next(error);
    }
  };

  //----------------------------------------------------------------------- dashboard
  vendorDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this._vendorShopService.getDashboard(
        req.body.userId
      );

      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.SUCCEESS, data: result });
      }
    } catch (error) {
      throw error;
    }
  };

  //=========================================================
  geVendorsDatas = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this._vendorShopService.getVendorsDatas();
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

  blockVendor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this._vendorShopService.blockVendor(req.body.id);

      res
        .status(StatusCodeEnum.OK)
        .json({ messeage: MessageEnum.VENDOR_DATA_UPDATION_SUCCESS });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  getVendorsRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this._vendorShopService.getVendorsVerification();
      res.status(StatusCodeEnum.OK).json({
        message: MessageEnum.VENDOR__DATA_FETCH_SUCCESS,
        data: result,
      });
    } catch (error: unknown) {}
  };

  rejectVendorRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this._vendorShopService.rejectVendorRequst(
        req.body.id
      );
      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.VENDOR_DENIED });
    } catch (error: unknown) {}
  };

  acceptVendorRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this._vendorShopService.verifyVendorRequst(
        req.body.id
      );
      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.VENDOR_VRIFIED });
    } catch (error: unknown) {}
  };

  //==================================================================
  getShopsData = async (req: Request, res: Response): Promise<void> => {
    try {
      const shops = await this._vendorShopService.getVendorsData();
      const activeShops = (shops || []).filter((shop) => shop.hasShop === true);
      res.status(StatusCodeEnum.OK).json({
        success: true,
        message: MessageEnum.SHOP_DATA_FETCH_SUCCESS,
        data: activeShops,
      });
    } catch (error: unknown) {
      console.error("Error fetching shops:", error);

      if (error instanceof Error) {
        res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: MessageEnum.SHOP_DATA_ADDED_FAILED,
          error: error.message,
          data: [],
        });
      } else {
        res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: MessageEnum.SERVER_ERROR,
          data: [],
        });
      }
    }
  };

  //--------------------------  add shopp images --------------------------
  addShopImages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let result = await this._vendorShopService.addShopImages(req.body);
      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.VENDOR_SHOP_IMAGE_ADDED_SUCCESS });
      }
    } catch (error) {
      next(error);
    }
  };

  //--------------------------  remove shopp images --------------------------
  removeShopImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {

      let result = await this._vendorShopService.removeImage(req.body)
      if(result){
        res
        .status(StatusCodeEnum.OK)
        .json({message:MessageEnum.VENDOR_SHOP_IMAGE_DELETED_SUCCESS})
      }
    } catch (error) {
      next(error)
    }
  };

  shopDataEach = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;

      const result = await this._vendorShopService.getEachVendorData(id);
      if (result) {
        res.status(StatusCodeEnum.OK).json({
          message: MessageEnum.VENDOR__DATA_FETCH_SUCCESS,
          data: result,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.VENDOR__DATA_FETCH_FAILED) {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
        } else {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
        }
      }
    }
  };
}

export default VendorController;
