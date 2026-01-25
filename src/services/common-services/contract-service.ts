import { IContractRepositoryInterface } from "../../interface/contract-interface/contract-respositlory-interface";
import { IContractServiceInterface } from "../../interface/contract-interface/contract-service-interface";
import { ContractDto } from "../../dto/contract-dto/contract-dto";
import { ContractMapper } from "../../mappers/contract-mapper/contract-mapper";
import { IAddContracValues, IContract } from "../../types/common-types";
import { ErrorResponse } from "../../utils/errorResponse"; // Assuming this exists based on other files
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum"; // Assuming this exists
import { MessageEnum } from "../../enums/messagesEnum"; // Assuming this exists
import { ICustomerAddressRepositoryInterface } from "../../interface/address-interface/address-repository-interface";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import { ContractStatusEnum } from "../../enums/contractEnum";
import { IGeoLocation } from "../../types/vendorType";

class ContractService implements IContractServiceInterface {
  private _ContractRepository: IContractRepositoryInterface;
  private _AddressRepository: ICustomerAddressRepositoryInterface;

  constructor(
    contractRepo: IContractRepositoryInterface,
    addressRepository: ICustomerAddressRepositoryInterface,
  ) {
    this._ContractRepository = contractRepo;
    this._AddressRepository = addressRepository;
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

    const location: IGeoLocation = {
      type: "Point",
      coordinates: [
        Number(selectedAddress!.coordiantes.lng),
        Number(selectedAddress!.coordiantes.lat),
      ],
    };

    const cosntractPayload = {
      contractId: `CTR-${nanoid(10)}`,
      customerId: new mongoose.Types.ObjectId(userId),
      addressId: new mongoose.Types.ObjectId(address),
      title: contractName,
      description: description,
      services: new mongoose.Types.ObjectId(serviceType),
      budget: 0,
      location,
      acceptedVendors: [],
      status: ContractStatusEnum.OPEN,
      createdAt: new Date(),
    };

    const result =
      await this._ContractRepository.addNewContract(cosntractPayload);

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

  /**
   *
   *    get workds  of vendor 
   *
   */


  /**
   *
   *    get contracts of vendor
   *
   */
}

export default ContractService;
