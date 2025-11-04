
import { IService, IServiceData } from "../../types/vendorType";



export interface IServiceRepositoryInterface{
    addService(data:IService):Promise<boolean>
    getService(shopId:string):Promise<IService[]|[]>
    editService(_id:string,data:IService):Promise<boolean>
    getSelectedService(_id:string):Promise<IService>

    //==============================================
        getEachvendorServices(_shopId:string):Promise<IServiceData[]|[]>//-------------------------------------------------
    getServiceData(shopId:string):Promise<IService[]|[]>//-------------------------------
    
}