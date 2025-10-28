import { MessageEnum } from "../../enums/messagesEnum";
import { IServiceTypesRepositoryInterface } from "../../interface/repositoryInterface/adminRepoInterface";
import { IShopTypeServiceInterface } from "../../interface/serviceInterface/adminServiceInterface";
import { IServiceType } from "../../types/adminTypes";

export class ServiceTypesService implements IShopTypeServiceInterface {
  private _ServiceTypeRepository: IServiceTypesRepositoryInterface;

  constructor(serviceTypeRepo: IServiceTypesRepositoryInterface) {
    this._ServiceTypeRepository = serviceTypeRepo;
  }

  //--------------------------------------------------------- add new service type
  addServiceType = async (data: {
    userId: string;
    serviceName: string;
    description: string;
  }): Promise<boolean | void> => {
    const { serviceName, description } = data;

    // check it exist or not if not add that service

    const result = await this._ServiceTypeRepository.addServiceType({
      serviceName,
      description,
      isActive: true,
    });

    if (result) {
      return true;
    } else {
      throw new Error(MessageEnum.SERVICE_ADD_FAILD);
    }
  };

  //--------------------------------------------------------- get service types

  getServices = async (): Promise<IServiceType[] | []> => {
    let result = await this._ServiceTypeRepository.getServices();
    return result;
  };

  //--------------------------------------------------------- update service types
  editServiceType = async (data: {
    _id: string;
    serviceName: string;
    description: string;
  }): Promise<boolean | void> => {
    const _id: string = data._id;
    const payload = {
      serviceName: data.serviceName,
      description: data.description,
    };
    let result = await this._ServiceTypeRepository.editServiceType(
      _id,
      payload
    );

    if (result) {
      return true;
    }

    throw new Error(MessageEnum.SERVER_ERROR);
  };
}
