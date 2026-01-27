import { IContractRepositoryInterface } from "../../interface/contract-interface/contract-respositlory-interface";
import { IContractServiceInterface } from "../../interface/contract-interface/contract-service-interface";
import { ContractDto } from "../../dto/contract-dto/contract-dto";
import { ContractMapper } from "../../mappers/contract-mapper/contract-mapper";
import { IAddContracValues, IContract, IPaginationMeta, IPaginationResponseMeta } from "../../types/common-types";
import { ErrorResponse } from "../../utils/errorResponse"; // Assuming this exists based on other files
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum"; // Assuming this exists
import { MessageEnum } from "../../enums/messagesEnum"; // Assuming this exists
import { ICustomerAddressRepositoryInterface } from "../../interface/address-interface/address-repository-interface";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import { ContractStatusEnum } from "../../enums/contractEnum";
import { IGeoLocation } from "../../types/vendorType";
import { IVendorRepo } from "../../interface/vendor-interface/vendor-respository-interface";

class ContractService implements IContractServiceInterface {
  private _ContractRepository: IContractRepositoryInterface;
  private _AddressRepository: ICustomerAddressRepositoryInterface;
  private _VendorRepositroy: IVendorRepo

  constructor(
    contractRepo: IContractRepositoryInterface,
    addressRepository: ICustomerAddressRepositoryInterface,
    vendorRepository : IVendorRepo
  ) {
    this._ContractRepository = contractRepo;
    this._AddressRepository = addressRepository;
    this._VendorRepositroy = vendorRepository
  }

  /**
   *
   *    add new contract
   *
   */
  async addNewContract(
    userId: string,
    contractData: IAddContracValues,
  ): Promise<ContractDto> {
    const { contractName, description, phone, address, serviceType } =
      contractData;


    const addressesData = await this._AddressRepository.getAllAddress(userId);
    let selectedAddress = addressesData?.address.find(
      (data) => data._id?.toString() === address.toString(),
    );

    if (!selectedAddress) {
      throw new ErrorResponse("Address not found", StatusCodeEnum.NOT_FOUND);
    }


    const location: IGeoLocation = {
      type: "Point",
      coordinates: [
        Number(selectedAddress?.coordinates.lng),
        Number(selectedAddress?.coordinates.lat),
      ],
    };

    const contractPayload = {
      contractId: `CTR-${nanoid(10)}`,
      customerId: new mongoose.Types.ObjectId(userId),
      address: {
        address: selectedAddress?.address || "",
        city: selectedAddress?.city || "",
        state: selectedAddress?.state || "",
        country: selectedAddress?.country || "",
        phone: selectedAddress?.phone || ""
      },
      title: contractName,
      description: description,
      service: new mongoose.Types.ObjectId(serviceType),
      budget: 0,
      location,
      acceptedVendors: [],
      status: ContractStatusEnum.OPEN,
      createdAt: new Date(),
    };

    const result =
      await this._ContractRepository.addNewContract(contractPayload);

    if (result) {
      return ContractMapper.toDTO(result);
    } else {
      throw new ErrorResponse(
        "Failed to create contract",
        StatusCodeEnum.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   *
   *    edit contract
   *
   */

  async editContract(
    contractId: string,
    contractData: Partial<IContract>,
  ): Promise<ContractDto | null> {
    const result = await this._ContractRepository.editContract(
      contractId,
      contractData,
    );
    if (result) {
      return ContractMapper.toDTO(result);
    } else {
      throw new ErrorResponse(
        "Failed to update contract",
        StatusCodeEnum.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   *
   *    get contract
   *
   */
  async getContract(contractId: string): Promise<ContractDto | null> {
    const result = await this._ContractRepository.getContract(contractId);
    if (result) {
      return ContractMapper.toDTO(result);
    } else {
      throw new ErrorResponse("Contract not found", StatusCodeEnum.NOT_FOUND);
    }
  }

  async getContracts(filter: any = {}): Promise<ContractDto[]> {
    const result = await this._ContractRepository.getContracts(filter);
    if (result) {
      return ContractMapper.toDTOList(result);
    } else {
      return [];
    }
  }

  /**
   *
   *    get contract of customer
   *
   */
  getCustomerContracts = async (customerId: string, query: { page?: string; limit?: string; search?: string; filter?: string; }): Promise<{ data: ContractDto[]; pagination: IPaginationResponseMeta; }> => {
    
      


  const result = await this._ContractRepository.getCustomerContracts(customerId,query)


    console.log('reult :>> ', result);
    return {
      data: ContractMapper.toDTOList(result.data),
      pagination: result.pagination
    }

  }

  /**
   *
   *    get workds  of vendor 
   *
   */
  getVendorContractWorks(vendorId: string, query: { page?: string; limit?: string; search?: string; lat?: number; lng?: number; distance?: number; }): Promise<{ data: ContractDto[]; pagination: IPaginationResponseMeta; }> {
    
  }


  /**
   *
   *    get contracts of vendor
   *
   */
}

export default ContractService;
