import {IServiceType } from "../../types/adminTypes";



export interface IShopTypeService{
   addServiceType (data:{userId:string;serviceName:string;description:string}):Promise<boolean|void>
   getServices ():Promise<IServiceType[]|[]>
   editServiceType (data:{_id:string;serviceName:string;description:string}):Promise<boolean|void>
}