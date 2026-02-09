import { FilterQuery } from "mongoose";
import {  IServiceType } from "../../types/adminTypes"








//----------------------------------------------------------service repository interface the service that given by adimin for each vendro
export interface IServiceTypesRepositoryInterface{
        addServiceType (data:{serviceName:string;description:string,isActive:boolean}):Promise<boolean>
        getServices():Promise<IServiceType[]|[]>
        editServiceType(_id:string,data: { serviceName: string; description: string; }): Promise<boolean>
        getServiceByCondition (data:FilterQuery<IServiceType>):Promise<IServiceType[]>
    vendorTypeData():Promise<IServiceType[]|null> //-------------------------------------
}