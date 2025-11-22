import { IServiceType } from "../../types/adminTypes";
import { IImage, IService, IShopData, IStaff, IStaffAdd, IVendor } from "../../types/vendorType";




export interface IVendorShopServiceInterface{

 addShopData (data:IShopData,vendorId:string,cordiantes:object,workingDays:string) :Promise<any>
 getShopData (id:string):Promise<IVendor>
 getShopTypes () :Promise<IServiceType[]|[]>
 getDashboard (data:string) :Promise<any>
 updateVendor(id:string,workingDays:string,data:IVendor):Promise<boolean|void>;
  getVendorsDatas(): Promise<IVendor[] | []>;//-----------DD
  blockVendor (customerId:string):Promise<boolean|void>;//-----------
  getVendorsVerification():Promise<IVendor []|[]>;//-----------
  rejectVendorRequst (_id:string):Promise<boolean|void>;//-----------
  verifyVendorRequst (_id:string):Promise<boolean|void>;//-----------
  getEachVendorData (data:string):Promise<IVendor|void>//---------------DD
  getVendorsData ():Promise<IVendor[]|null>//-----------------

  addShopImages (datas:{data:IImage,userId:string}):Promise<boolean|void>
  removeImage(data:{publicId:string,image_id:string,userId:string}):Promise<boolean|void>
    
}







