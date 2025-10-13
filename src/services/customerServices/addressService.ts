import { log } from "console";
import { ICustomerAddressRepositoryInterface } from "../../interface/repositoryInterface/customerInterface";
import { ICustomerAddressServiceInterface } from "../../interface/serviceInterface/customerServiceInterface";
import { IAddress, ICustomerAddressData } from "../../types/customerType";
import { MessageEnum } from "../../enums/messagesEnum";

export class CustomerAddressService
  implements ICustomerAddressServiceInterface
{
  private _addressRepository: ICustomerAddressRepositoryInterface;

  constructor(addressRepository: ICustomerAddressRepositoryInterface) {
    this._addressRepository = addressRepository;
  }

  //--------------------------------------------------------------add customer address
  addAddress = async (data: IAddress): Promise<void> => {
    try {
      const { userId, ...payload } = { ...data };

      if (userId) {
        let exist = await this._addressRepository.checkUserAddressExist(userId);

        if (exist) {
          payload.address = payload.address.toLocaleLowerCase();
          let addressExist = await this._addressRepository.checkAddressDuplicat(
            userId,
            payload.address
          );

          if (addressExist) {
            throw new Error(MessageEnum.ADDRESS_EXISTS);
          } else {
            await this._addressRepository.addAddress(userId, payload);
          }

          return;
        } else {
          await this._addressRepository.addFirstAddress(userId, payload);
          return;
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };

  //--------------------------------------------------------------get customer address
  getAddress = async (customerId: string): Promise<IAddress[] | []> => {
    let exist = await this._addressRepository.checkUserAddressExist(customerId);

    if (!exist) {
      return [];
    } else {
      let address = await this._addressRepository.getAllAddress(customerId);
      if (address) {
        return address?.address;
      } else {
        return [];
      }
    }
  };

  //--------------------------------------------------------------get customer address
  deletCustomerAddress = async (
    custoemrId: string,
    id: string
  ): Promise<string | void> => {
    try {
      let response = await this._addressRepository.deletCustomerAddress(
        custoemrId,
        id
      );

      if (response) {
        return MessageEnum.ADDRESS_DELETED_SUCCESS;
      } else {
        throw new Error(MessageEnum.ADDRESS_DELETED_FAILED);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };
  //--------------------------------------------------------------edit customer address
  editCustomerAddress = async (data: IAddress): Promise<boolean | void> => {
    try {
      let userId: string;
      if (data.userId) {
        userId = data.userId;
        const { _id, ...payload } = { ...data };
        payload.address = payload.address.toLocaleLowerCase();
        let existCheck = await this._addressRepository.checkAddressDuplicat(
          userId,
          payload.address,
          _id
        );

        
        if (existCheck) {
          throw new Error(MessageEnum.ADDRESS_EXISTS);
        } else {
          if (_id) {
           
            
            let result = await this._addressRepository.editCustomerAddress(
              userId,
              _id,
              payload
            );
          
            
            if (result) {
              return true;
            } else {
              throw new Error(MessageEnum.ADDRESS_UPDATED_FAILED);
            }
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };
}
