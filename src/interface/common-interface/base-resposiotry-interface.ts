import { Document, FilterQuery, UpdateQuery } from "mongoose"
import { ICustomerAddress } from "../../types/customerType";
import { IStaff } from "../../types/vendorType";
import { IPaginationMeta, IPaginationResponseMeta } from "../../types/common-types";


export interface IBaseRepositoryInterface<T extends Document> {
   
  create(data: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findByEmail(email:string) :Promise <T|null>
  updatePassword(email:string,hashedPassword:string):Promise <T|null>
  findByCustomer(customerId:string):Promise<ICustomerAddress | null>
  findAll(): Promise<T[]>
  findManyByCondition(conditions: Partial<T>):Promise<any>
  findOneByCondiition(conditions: Partial<T>):Promise<any>
  update(id: string, data: UpdateQuery<T>): Promise<T | null>
  filterWithPagination (options:IPaginationMeta,filter:FilterQuery<T>):Promise<{ data: T[]; pagination: IPaginationResponseMeta }>
}
