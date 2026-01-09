import { promises } from "dns";
import { IServiceType } from "../../types/adminTypes";
import { ServiceResponseDTO } from "../../dto/service-dto/service-dto";
import { IService } from "../../types/vendorType";
import { IPaginationResponseMeta } from "../../types/common-types";
// ... (imports)

//-------------------------------------------------vednor sevices
export interface IServiceInterface {
  addNewService(data: IService): Promise<boolean | void>;
  getAllService(shopId: string,query:{page?:string,limit?:string,search?:string}): Promise<{data:ServiceResponseDTO[],pagination:IPaginationResponseMeta}>;
  editService(data: IService): Promise<boolean | void>;
  getSelectedSerivce(_id:string):Promise<ServiceResponseDTO|void>

  //==============================================
  getEachVendorServices(data: string): Promise<ServiceResponseDTO[] | []>; //----------------
}
