import { Document, Model } from "mongoose";
import { IBaseRepositoryInterface } from "../interface/repositoryInterface/baseInterface";
import { ICustomerAddress } from "../types/customerType";

class BaseRepository<T extends Document>
  implements IBaseRepositoryInterface<T>
{

  private _Model: Model<T>;
  
  constructor(model: Model<T>) {
    this._Model = model;
  }

  async create(data: T): Promise<T> {
    const document = new this._Model(data);
    return document.save();
  }

  async findById(id: string): Promise<T | null> {
    return this._Model.findById(id);
  }

  async findByEmail(email: string): Promise<T | null> {
    return this._Model.findOne({ email });
  }

  
  async updatePassword(email: string, hashedPassword: string): Promise<T | null> {
    return this._Model.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );
  }

  
async findByCustomer(customerId: string): Promise<ICustomerAddress | null> {
    
    const address = await this._Model.findOne({ customerId }).lean();
    return address as ICustomerAddress | null;
  }
}

export default BaseRepository;
