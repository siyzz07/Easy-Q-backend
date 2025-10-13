import { MessageEnum } from "../../enums/messagesEnum";
import { ICustomerRepo } from "../../interface/repositoryInterface/customerInterface";
import { ICustomerServiceInterface } from "../../interface/serviceInterface/customerServiceInterface";
import { ICustomer } from "../../types/customerType";
import { IVendor } from "../../types/vendorType";



export class CustomerService implements ICustomerServiceInterface{

  private _customerRepository:ICustomerRepo

  constructor(customerRepo:ICustomerRepo){
    this._customerRepository = customerRepo
  }

  getVendorsData = async (): Promise<IVendor[] | null> => {
  try {
    const response = await this._customerRepository.getVendorsData();

    if (!response || response.length === 0) {
      return null; 
    }

    return response; 
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Get vendors data error:", error.message);
    }
    return null;
  }
};


getCustomerData = async(id: string): Promise<ICustomer | void> =>{
  try{

     let response:ICustomer|null = await this._customerRepository.customerDataById(id)
     if(response){
      return response
     }else{
      throw new Error(MessageEnum.CUSTOMER_DATA_FETCH_FAILED)
     }

  }catch(error:unknown){
      if(error){
        throw error
      }
  }
}





}