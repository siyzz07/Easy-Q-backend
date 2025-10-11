import { Document } from "mongoose"


export interface IBaseRepositoryInterface<T extends Document> {
   
  create(data: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findByEmail(email:string) :Promise <T|null>
  updatePassword(email:string,hashedPassword:string):Promise <T|null>
//   findAll(): Promise<T[]>;
//   update(id: string, data: Partial<T>): Promise<T | null>;
//   delete(id: string): Promise<T | null>;
}
