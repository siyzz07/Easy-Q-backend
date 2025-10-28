import { Document, Model, FilterQuery, UpdateQuery, FlattenMaps } from "mongoose";
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

  async updatePassword(
    email: string,
    hashedPassword: string
  ): Promise<T | null> {
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

  async findAll(): Promise<T[]> {
    return this._Model.find().exec();
  }

  async findManyByCondition(conditions: FilterQuery<T>): Promise<any> {
    return await this._Model.find(conditions).lean().exec();
  }

  async findOneByCondiition(conditions: FilterQuery<T>): Promise<any> {  
    return await this._Model.findOne(conditions).lean().exec()
  }

  async update(id: string, data: UpdateQuery<T>): Promise<any| null> {
    const updated = await this._Model.findByIdAndUpdate(id, data, { new: true }).lean<T>();
    return updated;
  }
}

export default BaseRepository;
