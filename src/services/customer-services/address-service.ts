import { IAddress } from "../../types/customerType";
import { MessageEnum } from "../../enums/messagesEnum";
import { ErrorResponse } from "../../utils/errorResponse";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { ICustomerAddressRepositoryInterface } from "../../interface/address-interface/address-repository-interface";
import { ICustomerAddressServiceInterface } from "../../interface/address-interface/address-service-interface";
import logger from "../../utils/logger";

export class CustomerAddressService
  implements ICustomerAddressServiceInterface
{
  private _addressRepository: ICustomerAddressRepositoryInterface;

  constructor(addressRepository: ICustomerAddressRepositoryInterface) {
    this._addressRepository = addressRepository;
  }

  /**
   *
   *
   */
  //--------------------------------------------------------------add customer address
  addAddress = async (data: IAddress): Promise<void> => {
    const { userId, ...payload } = { ...data };

    if (userId) {
      const exist = await this._addressRepository.checkUserAddressExist(userId);

      if (exist) {
        payload.address = payload.address.toLocaleLowerCase();
        const addressExist = await this._addressRepository.checkAddressDuplicat(
          userId,
          payload.address
        );

        if (addressExist) {
          throw new ErrorResponse(
            MessageEnum.ADDRESS_EXISTS,
            StatusCodeEnum.CONFLICT
          );
        } else {
          await this._addressRepository.addAddress(userId, payload);
        }

        return;
      } else {
        await this._addressRepository.addFirstAddress(userId, payload);
        return;
      }
    }
  };
  /**
   *
   *
   */
  //--------------------------------------------------------------get customer address
  getAddress = async (customerId: string): Promise<IAddress[] | []> => {
    const exist = await this._addressRepository.checkUserAddressExist(
      customerId
    );

    if (!exist) {
      return [];
    } else {
      const address = await this._addressRepository.getAllAddress(customerId);
      if (address) {
        return address?.address;
      } else {
        return [];
      }
    }
  };
  /**
   *
   *
   */
  //--------------------------------------------------------------get customer address
  deletCustomerAddress = async (
    custoemrId: string,
    id: string
  ): Promise<string | void> => {
    const response = await this._addressRepository.deletCustomerAddress(
      custoemrId,
      id
    );

    if (response) {
      return MessageEnum.ADDRESS_DELETED_SUCCESS;
    } else {
      throw new ErrorResponse(
        MessageEnum.ADDRESS_DELETED_FAILED,
        StatusCodeEnum.INTERNAL_SERVER_ERROR
      );
    }
  };
  /**
   *
   *
   */
  //--------------------------------------------------------------edit customer address
  editCustomerAddress = async (data: IAddress): Promise<boolean | void> => {
    let userId: string;
    if (data.userId) {
      userId = data.userId;
      const { _id, ...payload } = { ...data };
      payload.address = payload.address.toLocaleLowerCase();
      const existCheck = await this._addressRepository.checkAddressDuplicat(
        userId,
        payload.address,
        _id
      );
      if (existCheck) {
        throw new ErrorResponse(
          MessageEnum.ADDRESS_EXISTS,
          StatusCodeEnum.CONFLICT
        );
      } else {
        if (_id) {
          const result = await this._addressRepository.editCustomerAddress(
            userId,
            _id,
            payload
          );
          if (result) {
            return true;
          } else {
            throw new ErrorResponse(
              MessageEnum.ADDRESS_UPDATED_FAILED,
              StatusCodeEnum.NOT_FOUND
            );
          }
        }
      }
    }
  };

  //--------------------------------------------------------------get Each address
  getEachAddress = async (
    customerId: string,
    addressId: string
  ): Promise<IAddress | void> => {
    const result = await this._addressRepository.getAllAddress(customerId);

    if (!result) {
      logger.error("error to fetch selected address");
      throw new ErrorResponse(
        MessageEnum.ADDRESS_NOT_FOUND,
        StatusCodeEnum.NOT_FOUND
      );
    }
    const address = result?.address?.find(
      (addr: IAddress) => addr._id?.toString() === addressId
      
    );

    if(!address){
      logger.error("error to fetch selected address");
      throw new ErrorResponse(
        MessageEnum.ADDRESS_NOT_FOUND,
        StatusCodeEnum.NOT_FOUND
      );
    }
    return address
  };
}
