
import { IService } from "../../types/vendorType";



export interface IServiceRepositoryInterface{
    addService(data:IService):Promise<boolean>
    getService(shopId:string):Promise<IService[]|[]>
    editService(_id:string,data:IService):Promise<boolean>

    //==============================================
        getEachvendorServices(_shopId:string):Promise<IService[]|[]>//-------------------------------------------------
    getServiceData(shopId:string):Promise<IService[]|[]>//-------------------------------
    
}