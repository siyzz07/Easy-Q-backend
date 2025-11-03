import { NextFunction, Request, Response } from "express";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { ICustomerAddressServiceInterface } from "../../interface/address-interface/address-service-interface";

export class CustomerAddressContorller {
  private _addressService: ICustomerAddressServiceInterface;

  constructor(addressServicd: ICustomerAddressServiceInterface) {
    this._addressService = addressServicd;
  }

  //---------------------------------------------------------------------get all address
  getAddress = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      const custoemrId = req.body.userId;
      const response = await this._addressService.getAddress(custoemrId);

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.ADDRESS_FETCH_SUCCESS, data: response });
    } catch (error: unknown) {
      next(error)
    }
  };

  //---------------------------------------------------------------------add address
  addNewAddresss = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      await this._addressService.addAddress(req.body);

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.ADDRESS_ADDED_SUCCESS });
    } catch (error: unknown) {
      next(error)
    }
  };

  //---------------------------------------------------------------------delete address
  deleteAddress = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      const response = await this._addressService.deletCustomerAddress(
        req.body.userId,
        req.body.addressId
      );
      if (response) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.ADDRESS_DELETED_SUCCESS });
      }
    } catch (error: unknown) {
     next(error)
    }
  };

  //---------------------------------------------------------------------delete address
  editAddress = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      const result = await this._addressService.editCustomerAddress(req.body);

      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.ADDRESS_EDIT_SUCCESS });
      }
    } catch (error: unknown) {
      next(error)
    }
  };
}
