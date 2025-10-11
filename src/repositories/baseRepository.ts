import { Document, Model } from "mongoose";
import { IBaseRepositoryInterface } from "../interface/repositoryInterface/baseInterface";

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
}

export default BaseRepository;
