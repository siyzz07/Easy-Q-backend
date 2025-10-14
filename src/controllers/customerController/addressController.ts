import { Request, Response } from "express";
import { ICustomerAddressServiceInterface } from "../../interface/serviceInterface/customerServiceInterface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class CustomerAddressContorller {
  private _addressService: ICustomerAddressServiceInterface;

  constructor(addressServicd: ICustomerAddressServiceInterface) {
    this._addressService = addressServicd;
  }

  //---------------------------------------------------------------------get all address
  getAddress = async (req: Request, res: Response): Promise<void> => {
    try {
      const custoemrId = req.body.userId;
      const response = await this._addressService.getAddress(custoemrId);

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.ADDRESS_FETCH_SUCCESS, data: response });
    } catch (error: unknown) {
      console.log(error);

      res
        .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
        .json({ message: MessageEnum.SERVER_ERROR });
    }
  };

  //---------------------------------------------------------------------add address
  addNewAddresss = async (req: Request, res: Response): Promise<void> => {
    try {
      await this._addressService.addAddress(req.body);

      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.ADDRESS_ADDED_SUCCESS });
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof Error) {
        if (error.message === MessageEnum.ADDRESS_EXISTS) {
          res
            .status(StatusCodeEnum.CONFLICT)
            .json({ message: MessageEnum.ADDRESS_EXISTS });
        } else {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json({ message: MessageEnum.SERVER_ERROR });
        }
      }
    }
  };

  //---------------------------------------------------------------------delete address
  deleteAddress = async (req: Request, res: Response): Promise<void> => {
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
      if (error instanceof Error) {
        res
          .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
          .json({ message: MessageEnum.SERVER_ERROR });
      }
    }
  };

  //---------------------------------------------------------------------delete address
  editAddress = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._addressService.editCustomerAddress(req.body);

      if (result) {
        res
          .status(StatusCodeEnum.OK)
          .json({ message: MessageEnum.ADDRESS_EDIT_SUCCESS });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.ADDRESS_EXISTS) {
          res
            .status(StatusCodeEnum.CONFLICT)
            .json({ message: MessageEnum.ADDRESS_EXISTS });
        } else {
          res
            .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
            .json({ message: MessageEnum.SERVER_ERROR });
        }
      }
    }
  };
}
