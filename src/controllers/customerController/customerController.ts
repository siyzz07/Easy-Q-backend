import { Request, Response } from "express";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { ICustomerServiceInterface } from "../../interface/serviceInterface/customerServiceInterface";
import { MessageEnum } from "../../enums/messagesEnum";
import { json } from "body-parser";

export class CustomerController {
  private _customerService: ICustomerServiceInterface;

  constructor(customerservice: ICustomerServiceInterface) {
    this._customerService = customerservice;
  }

  getShopsData = async (req: Request, res: Response): Promise<void> => {
    try {
      const shops = await this._customerService.getVendorsData();
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

  getCustomerData = async (req: Request, res: Response): Promise<void> => {
    try {
      let id = req.body.userId;
      console.log(id);
      let response = await this._customerService.getCustomerData(id);
      if (response) {
        res
          .status(StatusCodeEnum.OK)
          .json({
            message: MessageEnum.CUSTOMER_DATA_FETCH_SUCCESS,
            data: response,
          });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.CUSTOMER_DATA_FETCH_FAILED) {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json({ message: MessageEnum.SERVER_ERROR });
        }
      }
    }
  };
}
