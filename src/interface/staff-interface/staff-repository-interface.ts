
import { UpdateQuery } from "mongoose";
import { IStaff} from "../../types/vendorType";
import { IPaginationResponseMeta } from "../../types/common-types";


//----------------------------------------------------vendor staff 
export interface IStaffRepositoryInterface {
    addStaff (data:IStaff):Promise<boolean>
     getStaff (shopId:string,query:{page?:string,limit?:string,search?:string,isActive?:string}): Promise<{data:IStaff[],pagination:IPaginationResponseMeta}>
    getSingleStaff(shopId:string,staffName?:string,staffId?:string):Promise<IStaff|null>
    editStaff(shopId:string,_id:string,data:any):Promise <boolean|void>
    duplicateStaffFind(shopId:string,staffName:string,staffId?:string):Promise <IStaff[]|[]>
    getStaffById (id:string):Promise<IStaff | null>
    updateStaff(id: string, data: UpdateQuery<IStaff>): Promise<IStaff | null>


    //=========================================================
      getStaffData(shopId:string):Promise<IStaff[]|[]>//-----------------------------------

}