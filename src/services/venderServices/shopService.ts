import { MessageEnum } from "../../enums/messagesEnum";
import { IVendorRepo } from "../../interface/repositoryInterface/vendorRepoInterface";
import { IVendorShopServiceInterface } from "../../interface/serviceInterface/vendorServiceInterface";
import { IServiceType } from "../../types/adminTypes";
import { IService, IShopData, IStaff, IVendor } from "../../types/vendorType";

class VendorShopService implements IVendorShopServiceInterface {
  private _vendorRepo: IVendorRepo;

  constructor(vendorRepo: IVendorRepo) {
    this._vendorRepo = vendorRepo;
  }


  //----------------------------------------- add shop extra data
  addShopData = async (
    data: IShopData,
    vendorId: string,
    cordinates: object
  ): Promise<any> => {
    try {
      const updateData = {
        ...data,
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

     const data = await this._vendorRepo.vendorTypeData()
     if(data){
      return data
     }else{
      return []
     }
   }


  //----------------------------------------- vendor dashboard
  getDashboard = async (data: string): Promise<any> => {
    const shopId= data

    let staffData = await this._vendorRepo.getStaffData(shopId)
    let serviceData = await this._vendorRepo.getServiceData(shopId)

    let totalStaff = staffData.length
    let availableStaff = staffData.reduce((acc:number,data:IStaff)=>{
        if(data.isActive ){
          acc+=1
        }
        return acc
    },0)

    let totalUnavailableStaff =staffData.reduce((acc:number,data:IStaff)=>{
        if(!data.isActive ){
          acc+=1
        }
        return acc
    },0)


    let totalService = serviceData.length
    let totalAvailableService = serviceData.reduce((acc:number,data:IService) =>{
      if(data.isActive){
        acc+=1
      }
      return acc
    },0)

    let totalUnavailableService = serviceData.reduce((acc:number,data:IService) =>{
      if(!data.isActive){
        acc+=1
      }
      return acc
    },0)
    

    return {totalStaff,availableStaff,totalUnavailableStaff,totalService,totalAvailableService,totalUnavailableService}

  }

}

export default VendorShopService;
