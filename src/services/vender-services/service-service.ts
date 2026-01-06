import mongoose from "mongoose";
import { IService, IServiceData, IStaff } from "../../types/vendorType";
import { MessageEnum } from "../../enums/messagesEnum";
import { IServiceRepositoryInterface } from "../../interface/service-interface/service-repository-interface";
import { IServiceInterface } from "../../interface/service-interface/service-service-interface";
import { ErrorResponse } from "../../utils/errorResponse";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import logger from "../../utils/logger";
import { IPaginationResponseMeta } from "../../types/common-types";

export class VendorServiceService implements IServiceInterface {
  private _ServiceRpository: IServiceRepositoryInterface;

  constructor(serviceRepository: IServiceRepositoryInterface) {
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
  getAllService = async (shopId: string ,query:{page?:string,limit?:string,search?:string}): Promise<{data:IService[],pagination:IPaginationResponseMeta}> => {
    const result = await this._ServiceRpository.getService(shopId,query);
    return result;
  };

  //-----------------------------------------------------------------------edit services of the shop
  editService = async (data: IService): Promise<boolean | void> => {
    const { _id, userId, ...payload } = { ...data };

    const result = await this._ServiceRpository.editService(
      _id as string,
      payload
    );
    if (result) {
      return true;
    }
  };

  //-----------------------------------------------------------------------get selected service
  getSelectedSerivce = async(_id: string): Promise<IService> => {
    const  result = await this._ServiceRpository.getSelectedService(_id)
    if(result){
        return result
    }else{
      logger.error('error to fetch the service')
      throw new ErrorResponse(MessageEnum.SERVICE_FETCH_FAILED,StatusCodeEnum.NOT_FOUND)
    }
  }


  //==========================================================

  //-------------------------------------DD
  getEachVendorServices = async (data: string): Promise<IServiceData[] | []> => {
    const result = await this._ServiceRpository.getEachvendorServices(data)
    return result as unknown as IServiceData[];
  };
}
