import { workerData } from "worker_threads";
import { MessageEnum } from "../../enums/messagesEnum";
import { IServiceRepositoryInterface } from "../../interface/service-interface/service-repository-interface";
import { IServiceInterface } from "../../interface/service-interface/service-service-interface";
import { IServiceTypesRepositoryInterface } from "../../interface/service-types-interface/service-type-repository-interface";
import { IStaffRepositoryInterface } from "../../interface/staff-interface/staff-repository-interface";
import { IVendorRepo } from "../../interface/vendor-interface/vendor-respository-interface";
import { IVendorShopServiceInterface } from "../../interface/vendor-interface/vendor-service-interface";
import { IServiceType } from "../../types/adminTypes";
import { IImage, IService, IShopData, IStaff, IVendor } from "../../types/vendorType";
import { ErrorResponse } from "../../utils/errorResponse";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import logger from "../../utils/logger";
import { deleteCloudinaryImage } from "../../utils/cloudinary";

class VendorService implements IVendorShopServiceInterface {
  private _vendorRepo: IVendorRepo;
  private _staffRepo:IStaffRepositoryInterface
  private _serviceTypesRepo:IServiceTypesRepositoryInterface
  private _serviceRepo :IServiceRepositoryInterface

  constructor(vendorRepo: IVendorRepo,staffRepo:IStaffRepositoryInterface,serviceTypes:IServiceTypesRepositoryInterface,serviceRepo:IServiceRepositoryInterface) {
    this._vendorRepo = vendorRepo;
    this._staffRepo= staffRepo
    this._serviceTypesRepo=serviceTypes
    this._serviceRepo = serviceRepo
  }


  //----------------------------------------- add shop extra data
  addShopData = async (
    data: IShopData,
    vendorId: string,
    cordinates: object,
    workingDays:string
  ): Promise<any> => {
    try {

      
    let days = workingDays.split(',')
    
    
      

      const updateData = {
        ...data,
        workingDays:days,
        cordinates,
        hasShop:true
      };

      const vendorData = await this._vendorRepo.vendorDatabyId(vendorId);
      if (vendorData) {
        const response = await this._vendorRepo.findByIdAndUpdate(
          vendorId,
          updateData
        );
        if (!response) {
          throw new Error(MessageEnum.SHOP_DATA_ADDED_FAILED);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.SHOP_DATA_ADDED_FAILED) {
          throw error;
        } else {
          console.log("server error for adding show data");
        }
      } else {
        console.log("server error for adding show data");
      }
    }
  };


   //----------------------------------------- add shop data
  getShopData = async (id: string): Promise<IVendor> =>{
    
     const data = await this._vendorRepo.vendorDatabyId(id)
     return data

  }

   //----------------------------------------- add shop extra data
   getShopTypes = async(): Promise<IServiceType[] | []> => {

     const data = await this._serviceTypesRepo.vendorTypeData()

     if(data){
      return data
     }else{
      return []
     }
   }


  //----------------------------------------- vendor dashboard
  getDashboard = async (data: string): Promise<any> => {
    const shopId= data


    const staffData = await this._staffRepo.getStaffData(shopId)
    const serviceData = await this._serviceRepo.getServiceData(shopId)
    

    const totalStaff = staffData.length
    const availableStaff = staffData.reduce((acc:number,data:IStaff)=>{
        if(data.isActive ){
          acc+=1
        }
        return acc
    },0)

    const totalUnavailableStaff =staffData.reduce((acc:number,data:IStaff)=>{
        if(!data.isActive ){
          acc+=1
        }
        return acc
    },0)


    const totalService = serviceData.length
    const totalAvailableService = serviceData.reduce((acc:number,data:IService) =>{
      if(data.isActive){
        acc+=1
      }
      return acc
    },0)

    const totalUnavailableService = serviceData.reduce((acc:number,data:IService) =>{
      if(!data.isActive){
        acc+=1
      }
      return acc
    },0)
    

    return {totalStaff,availableStaff,totalUnavailableStaff,totalService,totalAvailableService,totalUnavailableService}

  }



  
  //----------------------------------------- update vendor

  updateVendor = async( _id: string,workingDays:string,data:IVendor): Promise<boolean | void> => {
    
   
   let days = workingDays.split(',')
   const updateData = {
     ...data,
     workingDays:days,
    };

    const result = await this._vendorRepo.findByIdAndUpdate(_id as string,updateData)
      if(result){
        return true
      }else{
        throw new ErrorResponse(MessageEnum.VENDOR_DATA_UPDATION_FAILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
      }
  }












  //===============================================================
   verifyVendorRequst = async (_id: string): Promise<boolean | void> => {
    const result = await this._vendorRepo.verifyVendor(_id);
    return result;
  };


   rejectVendorRequst = async (_id: string): Promise<boolean | void> => {
    const result = await this._vendorRepo.rejectVendor(_id);
    return result;
  };


   getVendorsVerification = async (): Promise<IVendor[] | []> => {
    const result = await this.getVendorsDatas();

    if (result) {
      const data = result.filter(
        (value: IVendor) => value.isVerified == "pending"
      );
      return data;
    } else {
      return [];
    }
  };


   getVendorsDatas = async (): Promise<IVendor[] | []> => {
    const result = await this._vendorRepo.getVendorData();
    return result;
  };

  blockVendor = async (customerId: string): Promise<boolean | void> => {
    const result = await this._vendorRepo.blockVendor(customerId);

    return result;
  };



   getEachVendorData = async (data: string): Promise<IVendor | void>  => {
    
    console.log(data );
    
    const result = await this._vendorRepo.getEachVendorData(data)
    if(result){
      return result
    }else{
      throw new Error(MessageEnum.VENDOR__DATA_FETCH_FAILED)
    }
    
  }


   getVendorsData = async (): Promise<IVendor[] | null> => {
      try {
        const response = await this._vendorRepo.getVendorsData();
        
        if (!response || response.length === 0) {
          return null;
        }
        
        return response;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Get vendors data error:", error.message);
        }
        return null;
      }
    };


    //---------------------------- add shop image
    addShopImages = async (datas: { data: IImage; userId: string; }): Promise<boolean | void> => {
       let {userId,data} = datas
       let result = await this._vendorRepo.addImage(userId,data)
       if(result){
        logger.info('shop image added success')
        return true
       }else{
        logger.error('shop image adding failed')
        throw new ErrorResponse(MessageEnum.SERVER_ERROR,StatusCodeEnum.INTERNAL_SERVER_ERROR)
       }
    }

    //---------------------------- remove shop image
   removeImage = async (data: { publicId: string; image_id: string; userId: string; }): Promise<boolean| void> => {
      const {publicId,image_id,userId} = data
        const result = await deleteCloudinaryImage(publicId)

        if(result){

            let response = await this._vendorRepo.deleteShopImage(userId,image_id)

            if(response){
              logger.info('image deleted successfull')
              return true
            }
              logger.error('error to remove shop image')
              throw new ErrorResponse(MessageEnum.VENDOR_SHOP_IMAGE_DELETED_FAILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
            }else{
              logger.error('error to remove shop image')
              
              throw new ErrorResponse(MessageEnum.VENDOR_SHOP_IMAGE_DELETED_FAILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
        }
   }

}

export default VendorService;
