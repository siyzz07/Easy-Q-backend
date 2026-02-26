import mongoose, { FilterQuery, PopulateOptions } from "mongoose";
import { IContractRepository } from "../interface/contract-interface/contract-respositlory-interface";
import { Contract } from "../models/contractModel";
import { IContract, IPaginationResponseMeta } from "../types/common-types";
import { AdminContractStats, MonthlyData } from "../types/adminType";
import { ContractDto } from "../dto/contract-dto/contract-dto";
import BaseRepository from "./baseRepository";

class ContractRepository
  extends BaseRepository<IContract>
  implements IContractRepository
{
  private _ContractModel = Contract;
  constructor() {
    super(Contract);
  }

  async addNewContract(data: Partial<IContract>): Promise<IContract> {
    return await this.create(data as IContract);
  }

  async editContract(
    contractId: string,
    data: Partial<IContract>,
  ): Promise<IContract | null> {
    return await this._ContractModel
      .findOneAndUpdate({ _id: contractId }, data, { new: true })
      .exec();
  }

  async getContract(contractId: string): Promise<IContract | null> {
    return await this._ContractModel
      .findOne({ _id: contractId })
      .populate("customerId")
      .populate("service")
      .populate("acceptedVendors")
      .populate("appliedVendors")
      .exec();
  }

  async getContracts(filter: FilterQuery<IContract> = {}): Promise<IContract[]> {
    return await this._ContractModel
      .find(filter)
      .populate("customerId")
      .populate("service")
      .populate("acceptedVendors")
      .exec();
  }

  /**
   *
   *  get customer contract data
   *
   */
  async getCustomerContracts(
    customerId: string,
    query: { page?: string; limit?: string; search?: string; filter?: string },
  ): Promise<{ data: ContractDto[]; pagination: IPaginationResponseMeta }> {
    const filter: FilterQuery<IContract> = {
      customerId: customerId,
    };

    if (query.search?.trim().length) {
      filter.$or = [{ title: { $regex: query.search, $options: "i" } }];
    }

    if (query.filter !== "all") {
      filter.status = query.filter;
    }

    const options = {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 9,
      sort: { createdAt: -1 as const },
    };

    const populate: PopulateOptions[] = [
      { path: "customerId" },
      { path: "service" },
      { path: "acceptedVendors" },
      { path: "appliedVendors" },
    ];

    const result = await this.filterWithPagination<ContractDto>(options, filter, populate);
    return result;
  }

  /**
   *
   *  get vendor  works  data // the data that vendor see works and search works apply works
   *
   */
  async getVendorWrokWithPaginationAndLocation(
    vendorId: string,
    serviceType: string,
    query: {
      page?: string;
      limit?: string;
      search?: string;
      lat?: number;
      lng?: number;
      distance?: number;
      postedWithin: string;
    },
  ): Promise<{ data: ContractDto[]; pagination: IPaginationResponseMeta }> {
    const filter: FilterQuery<IContract> = {
      service: new mongoose.Types.ObjectId(serviceType),
    };

    if (query.lat && query.lng) {
      filter.location = {
        $geoWithin: {
          $centerSphere: [
            [Number(query.lng), Number(query.lat)],
            (Number(query.distance) || 10000) / 9378137,
          ],
        },
      };
    }

    filter.appliedVendors = { $nin: [vendorId] };
    filter.acceptedVendors = { $nin: [vendorId] };

    if (query.search?.trim()) {
      filter.$or = [];

      if (query.search?.trim()) {
        filter.$or.push({
          title: { $regex: query.search, $options: "i" },
        });
      }
    }

    if (query.postedWithin) {
      const now = new Date();
      let fromDate: Date | null = null;

      switch (query.postedWithin) {
        case "24h":
          fromDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;

        case "7d":
          fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;

        case "30d":
          fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
      }

      if (fromDate) {
        filter.createdAt = { $gte: fromDate };
      }
    }

    filter.isHiring = true;

    const options = {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sort: { createdAt: -1 } as const,
    };

    const populate: PopulateOptions[] = [
      { path: "customerId" },
      { path: "service" },
      { path: "acceptedVendors" },
      { path: "appliedVendors" },
    ];

    const result = await this.filterWithPagination<ContractDto>(options, filter, populate);
    return result;
  }

  /**
   *
   *  apply for a contract
   *
   */
  async applyForAContract(
    vendorId: string,
    contractId: string,
  ): Promise<boolean> {
    const result = await this._ContractModel.findByIdAndUpdate(
      contractId,
      {
        $addToSet: { appliedVendors: vendorId },
      },
      { new: true },
    );

    return !!result;
  }

  /**
   *
   *  remove vendor from contract request
   *
   */
  async removeFromContractRequest(
    contractId: string,
    vendorId: string,
  ): Promise<boolean> {
    const result = await this._ContractModel.findByIdAndUpdate(contractId, {
      $pull: { appliedVendors: vendorId },
    });

    return !!result;
  }

  /**
   *
   *  accept -- vendor from contract request
   *
   */
  async acceptVendorForContract(
    contractId: string,
    vendorId: string,
  ): Promise<boolean> {
    const result = await this._ContractModel.findOneAndUpdate(
      {
        _id: contractId,
        appliedVendors: vendorId,
        acceptedVendors: { $ne: vendorId },
      },
      {
        $addToSet: { acceptedVendors: vendorId },
        $pull: { appliedVendors: vendorId },
      },
      { new: true },
    );

    return !!result;
  }

  /**
   *
   *  accept -- vendor from contract request
   *
   */
  async getVendorContracts(
    vendorId: string,
    query: { page?: string; limit?: string; search?: string },
  ): Promise<{ data: ContractDto[]; pagination: IPaginationResponseMeta }> {
    const filter: FilterQuery<IContract> = {};

    if (query.search?.trim()) {  
      filter.$or = [{ title: { $regex: query.search, $options: "i" } }];
    }

    filter.acceptedVendors = { $in: [vendorId] };

    const options = {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 9,
      sort: { createdAt: -1 as const },
    };

    const populate: PopulateOptions[] = [
      { path: "customerId" },
      { path: "service" },
    ];

    const result = await this.filterWithPagination<ContractDto>(options, filter, populate);
    return result;
  }

  /**
   *
   *  get vendor applied contracts
   *
   */
  async getVendorAppliedContracts(
    vendorId: string,
    query: { page?: string; limit?: string; search?: string },
  ): Promise<{ data: ContractDto[]; pagination: IPaginationResponseMeta }> {
    const filter: FilterQuery<IContract> = {};

    if (query.search?.trim()) {
      filter.$or = [{ title: { $regex: query.search, $options: "i" } }];
    }

    filter.appliedVendors = { $in: [vendorId] };

    const options = {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 9,
      sort: { createdAt: -1 as const },
    };

    const populate: PopulateOptions[] = [
      { path: "customerId" },
      { path: "service" },
    ];

    const result = await this.filterWithPagination<ContractDto>(options, filter, populate);
    return result;
  }

  /**
   *
   *   remove from the accepted vendor contract
   *
   */
  async removeRomAcceptedVendor(
    contractId: string,
    vendorId: string,
  ): Promise<boolean> {
    const result = await this._ContractModel.findByIdAndUpdate(contractId, {
      $pull: { acceptedVendors: vendorId },
    });

    return !!result;
  }

  /**
   *
   *  get contract stats
   *
   */
  async getContractStats(vendorId: string, year: number): Promise<MonthlyData[]> {
    try {
      const stats = await this._ContractModel.aggregate([
        {
          $match: {
            acceptedVendors: new mongoose.Types.ObjectId(vendorId),
            createdAt: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id": 1 },
        },
      ]);
      return stats;
    } catch (error) {
      console.error("Error fetching contract stats:", error);
      throw error;
    }
  }

  async getAdminContractStats(): Promise<AdminContractStats> {
    try {
      const stats = await this._ContractModel.aggregate([
        {
          $group: {
            _id: null,
            totalContracts: { $sum: 1 },
            openContracts: {
              $sum: { $cond: [{ $eq: ["$status", "open"] }, 1, 0] },
            },
            completedContracts: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
            cancelledContracts: {
              $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
            },
          },
        },
      ]);
      return stats[0] || { totalContracts: 0, openContracts: 0, completedContracts: 0, cancelledContracts: 0 };
    } catch (error) {
      console.error("Error fetching admin contract stats:", error);
      throw error;
    }
  }
}

export default ContractRepository;
