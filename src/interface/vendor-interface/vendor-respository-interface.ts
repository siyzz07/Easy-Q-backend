import { IPaginationResponseMeta } from "../../types/common-types";
import { IImage, IVendor } from "../../types/vendorType";


export interface IVendorRepositoryInterface {
    addNewVendor(data:IVendor):Promise<boolean>
    checkVendorExist(email:string):Promise<boolean>
    vendorData(email:string):Promise<IVendor|any>
    vendorDatabyId(id:string) :Promise<IVendor|any>
    findByIdAndUpdate (id:string,data:object) :Promise<any>
    resetPassword (email:string,passowrd:string):Promise<void>
    deleteVendor (email:string):Promise<null>
    

    getVendorData():Promise<IVendor[]|[]> //--------------------DD
    getVendorDataPaginaition(query:{page?:string,limit?:string , search?:string}): Promise<{data: IVendor[] ,pagination:IPaginationResponseMeta}>; //--------------------DD

    blockVendor(_id:string):Promise<boolean> //--------------------
    rejectVendor(_id:string):Promise<boolean> //--------------------
    verifyVendor(_id:string):Promise<boolean> //--------------------


    getVendorsData() :Promise<IVendor[]|null> //-------------------------------------------------DD
    getEachVendorData(_id:string):Promise<IVendor|null>//-------------------------------------------------
    

    addImage (_id:string,image:IImage[]):Promise<boolean>
    deleteShopImage(_id:string,imageId:string):Promise<boolean>

    vendorsDataWithPagination (data:{search?:string,page?:string,limit?:string, lat?:number, lng?: number,distance?:number, categories?:string[],ratings?:string[]}):Promise<{data:IVendor[],pagination: IPaginationResponseMeta}>
    getMonthlyUserGrowth(year: number): Promise<any>
}
