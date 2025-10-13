import { Document } from "mongoose"
import { ICustomerAddress } from "../../types/customerType";


export interface IBaseRepositoryInterface<T extends Document> {
   
  create(data: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findByEmail(email:string) :Promise <T|null>
  updatePassword(email:string,hashedPassword:string):Promise <T|null>
  findByCustomer(customerId:string):Promise<ICustomerAddress | null>

}
