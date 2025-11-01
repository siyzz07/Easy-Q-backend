import mongoose from "mongoose";
import { IServiceRepositoryInterface } from "../../interface/repositoryInterface/vendorRepoInterface";
import { IServiceInterface } from "../../interface/serviceInterface/vendorServiceInterface";
import { IService, IStaff } from "../../types/vendorType";
import { MessageEnum } from "../../enums/messagesEnum";

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
      throw new Error(MessageEnum.VENDOR_SERVICE_ADD_FAILD);
    }
  };


  //-----------------------------------------------------------------------get services of the shop
  getAllService = async (shopId: string): Promise<IService[] | []> =>{
    
    
    const result = await this._ServiceRpository.getService(shopId)
    return result
    
  }

  //-----------------------------------------------------------------------edit services of the shop
  editService = async (data: IService): Promise<boolean | void> => {
     
    const{_id,userId,...payload} = {...data}
   
      const result = await this._ServiceRpository.editService(_id as string,payload)
      if(result){
        return true
      }
  }
}
