import mongoose from "mongoose";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";
import { IServiceTypesRepository } from "../../interface/service-types-interface/service-type-repository-interface";
import { IShopTypeService } from "../../interface/service-types-interface/service-type-service-interface";
import { IServiceType } from "../../types/adminTypes";
import { ErrorResponse } from "../../utils/errorResponse";
import logger from "../../utils/logger";

export class ServiceTypesService implements IShopTypeService {
  private _ServiceTypeRepository: IServiceTypesRepository;

  constructor(serviceTypeRepo: IServiceTypesRepository) {
    this._ServiceTypeRepository = serviceTypeRepo;
  }

  //--------------------------------------------------------- add new service type
  addServiceType = async (data: {
    userId: string;
    serviceName: string;
    description: string;
  }): Promise<boolean | void> => {
    const { serviceName, description } = data;

    const duplicate = await this._ServiceTypeRepository.getServiceByCondition({
      serviceName: serviceName,
    });

    if (duplicate.length) {
      throw new ErrorResponse(
        MessageEnum.SERVICE_ALREADY_EXIST,
        StatusCodeEnum.CONFLICT,
      );
    }
    const result = await this._ServiceTypeRepository.addServiceType({
      serviceName,
      description,
      isActive: true,
    });

    if (result) {
      return true;
    } else {
      throw new ErrorResponse(
        MessageEnum.SERVICE_ADD_FAILD,
        StatusCodeEnum.INTERNAL_SERVER_ERROR,
      );
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

    const duplicate = await this._ServiceTypeRepository.getServiceByCondition({
      serviceName: payload.serviceName,
      _id: { $ne: new mongoose.Types.ObjectId(_id) },
    });

    if(duplicate.length>=0){
      logger.error(MessageEnum.SERVICE_ALREADY_EXIST)
      throw new ErrorResponse(
      MessageEnum.SERVICE_ALREADY_EXIST,
      StatusCodeEnum.CONFLICT,
    );
    }

    const result = await this._ServiceTypeRepository.editServiceType(
      _id,
      payload,
    );

    if (result) {
      return true;
    }

    throw new ErrorResponse(
      MessageEnum.SERVER_ERROR,
      StatusCodeEnum.INTERNAL_SERVER_ERROR,
    );
  };
}
