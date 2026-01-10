import { promises } from "dns";
import { IServiceType } from "../../types/adminTypes";
import { ServiceResponseDTO } from "../../dto/service-dto/service-dto";
import { IService, IServiceData } from "../../types/vendorType";
import { IPaginationResponseMeta } from "../../types/common-types";
// ... (imports)

//-------------------------------------------------vednor sevices
export interface IServiceInterface {
  addNewService(data: IService): Promise<boolean | void>;
  getAllService(shopId: string,query:{page?:string,limit?:string,search?:string}): Promise<{data:ServiceResponseDTO[],pagination:IPaginationResponseMeta}>;
  editService(data: IService): Promise<boolean | void>;
  getSelectedSerivce(_id:string):Promise<ServiceResponseDTO|void>
  getSelectedSerivcePopulated(_id:string):Promise<IServiceData|void>

  //==============================================
  getEachVendorServices(data: string): Promise<ServiceResponseDTO[] | []>; //----------------
}
