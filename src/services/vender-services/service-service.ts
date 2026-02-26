import mongoose from "mongoose";
import { IService, IServiceData } from "../../types/vendorType";
import { MessageEnum } from "../../enums/messagesEnum";
import { IServiceRepository } from "../../interface/service-interface/service-repository-interface";
import { IServiceInterface } from "../../interface/service-interface/service-service-interface";
import { ErrorResponse } from "../../utils/errorResponse";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import logger from "../../utils/logger";
import { IPaginationResponseMeta } from "../../types/common-types";
import { ServiceResponseDTO } from "../../dto/service-dto/service-dto";
import { ServiceMapper } from "../../mappers/service-mapper/service-mapper";

export class VendorServiceService implements IServiceInterface {
  private _ServiceRpository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this._ServiceRpository = serviceRepository;
  }

  //-----------------------------------------------------------------------add new service for the shop
  addNewService = async (data: IService): Promise<boolean | void> => {
    const id = data.userId;
    const serviceData: IService = {
      serviceName: data.serviceName,
      shopId: new mongoose.Types.ObjectId(id),
      duration: data.duration,
      description: data.description,
      price: data.price,
      image: data.image,
      isActive: true,
      availableStaff: data.availableStaff,
    };

    const result = await this._ServiceRpository.addService(serviceData);

    if (result) {
      return true;
    } else {
      throw new ErrorResponse(
        MessageEnum.VENDOR_SERVICE_ADD_FAILD,
        StatusCodeEnum.NOT_FOUND
      );
    }
  };

  //-----------------------------------------------------------------------get services of the shop /DD
  getAllService = async (shopId: string ,query:{page?:string,limit?:string,search?:string}): Promise<{data:ServiceResponseDTO[],pagination:IPaginationResponseMeta}> => {
    const result = await this._ServiceRpository.getService(shopId,query);
    return {
        data: ServiceMapper.toDTOList(result.data),
        pagination: result.pagination
    };
  };

  //-----------------------------------------------------------------------edit services of the shop
  editService = async (data: IService): Promise<boolean | void> => {
    const { _id, ...payload } = { ...data };
    const result = await this._ServiceRpository.editService(
      _id as string,
      payload
    );
    if (result) {
      logger.info('service edited successully')
      return true;
    }else{
      logger.error('error to edit service')
    }
  };

  //-----------------------------------------------------------------------get selected service
  getSelectedSerivce = async(_id: string): Promise<ServiceResponseDTO> => {
    const  result = await this._ServiceRpository.getSelectedService(_id)
    if(result){
        return ServiceMapper.toDTO(result)
    }else{
      logger.error('error to fetch the service')
      throw new ErrorResponse(MessageEnum.SERVICE_FETCH_FAILED,StatusCodeEnum.NOT_FOUND)
    }
  }
  //-----------------------------------------------------------------------get selected populated
  getSelectedSerivcePopulated = async(_id: string): Promise<IServiceData|void> => {
    const  result = await this._ServiceRpository.getSelectedServicePopulated(_id)
    if(result){
       return  result
    }else{
      logger.error('error to fetch the service')
      throw new ErrorResponse(MessageEnum.SERVICE_FETCH_FAILED,StatusCodeEnum.NOT_FOUND)
    }
  }


  //==========================================================

  //-------------------------------------DD
  getEachVendorServices = async (data: string): Promise<ServiceResponseDTO[] | []> => {
    const result = await this._ServiceRpository.getEachvendorServices(data)
    return ServiceMapper.toDTOList(result as unknown as IService[]);
  };
}
