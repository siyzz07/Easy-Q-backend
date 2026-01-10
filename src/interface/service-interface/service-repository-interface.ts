
import { IPaginationResponseMeta } from "../../types/common-types";
import { IService, IServiceData } from "../../types/vendorType";



export interface IServiceRepositoryInterface{
    addService(data:IService):Promise<boolean>
    getService(shopId:string,query:{page?:string,limit?:string,search?:string}): Promise<{data:IService[],pagination:IPaginationResponseMeta}>
    editService(_id:string,data:IService):Promise<boolean>
    getSelectedService(_id:string):Promise<IService | null>
    getSelectedServicePopulated(_id:string):Promise<IServiceData | null>

    //==============================================
        getEachvendorServices(_shopId:string):Promise<IServiceData[]|[]>//-------------------------------------------------
    getServiceData(shopId:string):Promise<IService[]|[]>//-------------------------------
    
}