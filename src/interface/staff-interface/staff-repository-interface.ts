
import { IStaff} from "../../types/vendorType";


//----------------------------------------------------vendor staff 
export interface IStaffRepositoryInterface {
    addStaff (data:IStaff):Promise<boolean>
    getStaff (shopId:string):Promise<IStaff []|[]>
    getSingleStaff(shopId:string,staffName?:string,staffId?:string):Promise<IStaff|null>
    editStaff(shopId:string,_id:string,data:any):Promise <boolean|void>
    duplicateStaffFind(shopId:string,staffName:string,staffId?:string):Promise <IStaff[]|[]>
  


    //=========================================================
      getStaffData(shopId:string):Promise<IStaff[]|[]>//-----------------------------------

}