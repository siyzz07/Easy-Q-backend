import {  FilterQuery, UpdateQuery } from "mongoose"
import { ICustomerAddress } from "../../types/customerType";
import { IPaginationMeta, IPaginationResponseMeta } from "../../types/common-types";


export interface IBaseRepositoryInterface<T> {
   
  create(data: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findByEmail(email:string) :Promise <T|null>
  updatePassword(email:string,hashedPassword:string):Promise <T|null>
  findByCustomer(customerId:string):Promise<ICustomerAddress | null>
  findAll(): Promise<T[]>
  findManyByCondition(conditions: Partial<T>):Promise<T[]>
  findOneByCondiition(conditions: Partial<T>):Promise<T | null>
  update(id: string, data: UpdateQuery<T>): Promise<T | null>
  filterWithPagination<R = T> (options:IPaginationMeta,filter:FilterQuery<T>):Promise<{ data: R[]; pagination: IPaginationResponseMeta }>
}
