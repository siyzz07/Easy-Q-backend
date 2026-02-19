import { IServiceType } from "../../types/adminTypes";
import { IPaginationResponseMeta } from "../../types/common-types";
import { IImage, IShopData, IVendor } from "../../types/vendorType";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";

export interface IVendorShopService{

 addShopData (data:IShopData,vendorId:string,coordinates:{lat:number,lon:number},workingDays:string) :Promise<any>
 getShopData (id:string):Promise<VendorDto>
 getShopTypes () :Promise<IServiceType[]|[]>
 getDashboard (data:string, year?: number) :Promise<any>
 updateVendor(id:string,workingDays:string,data:IVendor):Promise<boolean|void>;

  getEachVendorData (data:string):Promise<VendorDto|void>
  getVendorsData (data:{search?:string,page?:string,limit?:string,lat?:number,lng?:number,distance?:number,categories?:string[],ratings?:string[]}):Promise<{data:VendorDto[],pagination: IPaginationResponseMeta}>

  addShopImages (datas:{data:IImage[],userId:string}):Promise<boolean|void>
  removeImage(data:{publicId:string,image_id:string,userId:string}):Promise<boolean|void>
    
}
