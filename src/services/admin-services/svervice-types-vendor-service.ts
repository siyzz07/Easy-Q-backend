import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IServiceTypesRepositoryInterface } from "../../interface/repositoryInterface/adminRepoInterface";
import { IShopTypeServiceInterface } from "../../interface/serviceInterface/adminServiceInterface";
import { IServiceType } from "../../types/adminTypes";
import { ErrorResponse } from "../../utils/errorResponse";

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

    

    const result = await this._ServiceTypeRepository.addServiceType({
      serviceName,
      description,
      isActive: true,
    });

    if (result) {
      return true;
    } else {
      // throw new Error(MessageEnum.SERVICE_ADD_FAILD);
      throw new ErrorResponse(MessageEnum.SERVICE_ADD_FAILD,StatusCodeEnum.INTERNAL_SERVER_ERROR)
    }
  };

  //--------------------------------------------------------- get service types

  getServices = async (): Promise<IServiceType[] | []> => {
    const result = await this._ServiceTypeRepository.getServices();
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
    const result = await this._ServiceTypeRepository.editServiceType(
      _id,
      payload
    );

    if (result) {
      return true;
    }

    throw new ErrorResponse(MessageEnum.SERVER_ERROR,StatusCodeEnum.INTERNAL_SERVER_ERROR);
  };
}
