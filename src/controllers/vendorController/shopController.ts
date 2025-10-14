import { Request, Response } from "express";
import { IVendorShopServiceInterface } from "../../interface/serviceInterface/vendorServiceInterface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";


class VendorShopController {
  private _vendorShopService: IVendorShopServiceInterface;

  constructor(vendorService: IVendorShopServiceInterface) {
    this._vendorShopService = vendorService;
  }

  addShopData = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, latitude, longitude, ...data } = { ...req.body };


      const cordinates = {
        lat: latitude,
        lon: longitude,
      };
      await this._vendorShopService.addShopData(data, userId, cordinates);

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

  getShopData = async (req: Request, res: Response): Promise<void> => {
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
}

export default VendorShopController;
