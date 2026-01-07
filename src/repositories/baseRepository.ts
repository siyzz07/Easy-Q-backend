import {
  Document,
  Model,
  FilterQuery,
  UpdateQuery,
  FlattenMaps,
  PopulateOptions,
} from "mongoose";

import { ICustomerAddress } from "../types/customerType";
import { IBaseRepositoryInterface } from "../interface/common-interface/base-resposiotry-interface";
import {
  IPaginationMeta,
  IPaginationResponseMeta,
} from "../types/common-types";
import { options } from "joi";

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
    return await this._Model.findOne(conditions).lean().exec();
  }

  async update(id: string, data: UpdateQuery<T>): Promise<any | null> {
    const updated = await this._Model
      .findByIdAndUpdate(id, data, { new: true })
      .lean<T>();
    return updated;
  }

  //---- filter with pagination
  async filterWithPagination(
  options: IPaginationMeta,
  filter: FilterQuery<T>,
  populate: PopulateOptions[] = []
): Promise<{ data: T[]; pagination: IPaginationResponseMeta }> {
  const page = Math.max(options?.page || 1, 1);
  const limit = Math.max(options?.limit || 10, 1);
  const skip = (page - 1) * limit;
  const sort = options?.sort ?? { _id: -1 };

  const query = this._Model.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);


  populate.forEach((p) => query.populate(p));

  const [data, total] = await Promise.all([
    query.lean<T[]>(),
    this._Model.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
}

}

export default BaseRepository;
