import { IServiceType } from "../../types/adminTypes";
import { IService, IShopData, IStaff, IStaffAdd, IVendor } from "../../types/vendorType";




//-------------------------------------------------vednor sevices
export interface IServiceInterface{
    addNewService(data:IService):Promise<boolean|void>
    getAllService(shopId:string):Promise<IService[]|[]>
    editService(data:IService):Promise<boolean|void>

    //==============================================
    getEachVendorServices(data:string):Promise<IService[]|[]>//----------------
}