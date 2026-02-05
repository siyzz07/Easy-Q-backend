import { NextFunction, Request, Response } from "express";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IVendorShopServiceInterface } from "../../interface/vendor-interface/vendor-service-interface";
import { workerData } from "worker_threads";
import { log } from "console";

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
      const coordinates = {
        lat: latitude,
        lon: longitude,
      };

      await this._vendorShopService.addShopData(
        data,
        userId,
        coordinates,
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

      const result = await this._vendorShopService.updateVendor(
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


  //==================================================================
  getShopsData = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      page,
      limit,
      lat,
      lng,
      distance,
    } = req.query;

    const categories =(req.query.categories ||req.query["categories[]"] ||[]) as string[];

    const ratings =(req.query.ratings ||req.query["ratings[]"] ||[]) as string[];


    const result = await this._vendorShopService.getVendorsData({
      search: search as string,
      page: page as string,
      limit: limit as string,
      lat: lat ? Number(lat) : undefined,
      lng: lng ? Number(lng) : undefined,
      distance: distance ? Number(distance) : undefined,
      categories,
      ratings,
    });

    res.status(StatusCodeEnum.OK).json({
      success: true,
      message: MessageEnum.SHOP_DATA_FETCH_SUCCESS,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error: unknown) {
    console.error("Error fetching shops:", error);

    res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : MessageEnum.SERVER_ERROR,
      data: [],
    });
  }
};

  //--------------------------  add shopp images --------------------------
  addShopImages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {


      const result = await this._vendorShopService.addShopImages(req.body);
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

      const result = await this._vendorShopService.removeImage(req.body)
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
