"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    constructor(model) {
        this._Model = model;
    }
    async create(data) {
        const document = new this._Model(data);
        return document.save();
    }
    async findById(id) {
        return this._Model.findById(id);
    }
    async findByEmail(email) {
        return this._Model.findOne({ email });
    }
    async updatePassword(email, hashedPassword) {
        return this._Model.findOneAndUpdate({ email }, { $set: { password: hashedPassword } }, { new: true });
    }
    async findByCustomer(customerId) {
        const address = await this._Model.findOne({ customerId }).lean();
        return address;
    }
    async findAll() {
        return this._Model.find().exec();
    }
    async findManyByCondition(conditions) {
        return await this._Model.find(conditions).lean().exec();
    }
    async findOneByCondiition(conditions) {
        return await this._Model.findOne(conditions).lean().exec();
    }
    async update(id, data) {
        const updated = await this._Model
            .findByIdAndUpdate(id, data, { new: true })
            .lean();
        return updated;
    }
    //---- filter with pagination
    async filterWithPagination(options, filter) {
        const page = Math.max(options?.page || 1, 1);
        const limit = Math.max(options?.limit || 10, 1);
        const skip = (page - 1) * limit;
        const sort = options?.sort ?? { _id: -1 };
        const [data, total] = await Promise.all([
            this._Model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
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
exports.default = BaseRepository;
