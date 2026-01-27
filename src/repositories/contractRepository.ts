import mongoose, { FilterQuery, mongo, PopulateOptions } from "mongoose";
import { IContractRepositoryInterface } from "../interface/contract-interface/contract-respositlory-interface";
import { Contract } from "../models/contractModel";
import { IContract, IPaginationResponseMeta } from "../types/common-types";
import BaseRepository from "./baseRepository";
import { ContractDto } from "../dto/contract-dto/contract-dto";

class ContractRepository
  extends BaseRepository<IContract>
  implements IContractRepositoryInterface
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
      .findOneAndUpdate({ contractId: contractId }, data, { new: true })
      .exec();
  }

  async getContract(contractId: string): Promise<IContract | null> {
    return await this._ContractModel
      .findOne({ contractId: contractId })
      .populate("customerId")
      .populate("service")
      .populate("acceptedVendors")
      .populate("appliedVendors")
      .exec();
  }

  async getContracts(filter: any = {}): Promise<IContract[]> {
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
  ): Promise<{ data: any[]; pagination: IPaginationResponseMeta }> {
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

    let result = await this.filterWithPagination(options, filter, populate);
    return result;
  }

  /**
   *
   *  get vendor  works  data // the data that vendor see works and search works apply works
   *
   */
   async getVendorWrokWithPaginationAndLocation(
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

    const options = {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sort: { createdAt: -1 } as const,
    };

    const populate :PopulateOptions[] = [
           { path: "customerId" },
      { path: "service" },
      { path: "acceptedVendors" },
      { path: "appliedVendors" },
    ]

    const  result: {
  data: ContractDto[];
  pagination: IPaginationResponseMeta;
} = await this.filterWithPagination(options,filter,populate)

  }
}

export default ContractRepository;
