import { NextFunction, Request, Response } from "express";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { ICustomerAddressService } from "../../interface/address-interface/address-service-interface";

export class CustomerAddressContorller {
  private _addressService: ICustomerAddressService;

  constructor(addressServicd: ICustomerAddressService) {
    this._addressService = addressServicd;
  }

  //---------------------------------------------------------------------get all address
  getAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {

      console.log('in address reached');
      
      const custoemrId = req.body.userId;
      const response = await this._addressService.getAddress(custoemrId);

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.ADDRESS_FETCH_SUCCESS, data: response });
    } catch (error: unknown) {
      next(error);
    }
  };

  //---------------------------------------------------------------------add address
  addNewAddresss = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this._addressService.addAddress(req.body);

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.ADDRESS_ADDED_SUCCESS });
    } catch (error: unknown) {
      next(error);
    }
  };

  //---------------------------------------------------------------------delete address
  deleteAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {

      const addresId = req.params.addressId
      const response = await this._addressService.deletCustomerAddress(
        req.body.userId,
       addresId
      );
      if (response) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.ADDRESS_DELETED_SUCCESS });
      }
    } catch (error: unknown) {
      next(error);
    }
  };

  //---------------------------------------------------------------------edit  address
  editAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this._addressService.editCustomerAddress(req.body);

      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.ADDRESS_EDIT_SUCCESS });
      }
    } catch (error: unknown) {
      next(error);
    }
  };
  //--------------------------------------------------------------------- get each data
  eachAddressData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { _id } = req.query;

      const result = await this._addressService.getEachAddress(
        req.body.userId,
        _id as string
      );

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.ADDRESS_FETCH_SUCCESS, data: result });
    } catch (error: unknown) {
      next(error);
    }
  };
}
