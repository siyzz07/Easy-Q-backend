import { IContractRepositoryInterface } from "../../interface/contract-interface/contract-respositlory-interface";
import { IContractServiceInterface } from "../../interface/contract-interface/contract-service-interface";
import { ContractDto } from "../../dto/contract-dto/contract-dto";
import { ContractMapper } from "../../mappers/contract-mapper/contract-mapper";
import {
  IAddContracValues,
  IContract,
  IPaginationMeta,
  IPaginationResponseMeta,
} from "../../types/common-types";
import { ErrorResponse } from "../../utils/errorResponse";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import {
  ContractNotificationContentEnum,
  ContractNotificationTitleEnum,
  MessageEnum,
} from "../../enums/messagesEnum";
import { ICustomerAddressRepositoryInterface } from "../../interface/address-interface/address-repository-interface";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import { ContractStatusEnum } from "../../enums/contractEnum";
import { IGeoLocation } from "../../types/vendorType";
import { IVendorRepo } from "../../interface/vendor-interface/vendor-respository-interface";
import logger from "../../utils/logger";
import { string } from "joi";
import { INotificationServiceInterface } from "../../interface/notificaion-interface/notification-service-interface";
import { INotificationRepositoryInterface } from "../../interface/notificaion-interface/notificaion-repository-interface";
import { BookingStatusEnum } from "../../enums/bookingStatusEnum";
import {
  ContractNotificationTypeEnum,
  NotificationCategoryEnum,
} from "../../enums/notificationEnum";
import { IChatRoomServiceInterface } from "../../interface/chatRoom-interface/chatRoom-Service-Interface";

class ContractService implements IContractServiceInterface {
  private _ContractRepository: IContractRepositoryInterface;
  private _AddressRepository: ICustomerAddressRepositoryInterface;
  private _VendorRepositroy: IVendorRepo;
  private _NotificationService: INotificationServiceInterface;
  private _ChatRoomService: IChatRoomServiceInterface;

  constructor(
    contractRepo: IContractRepositoryInterface,
    addressRepository: ICustomerAddressRepositoryInterface,
    vendorRepository: IVendorRepo,
    notificationService: INotificationServiceInterface,
    chatRoomService: IChatRoomServiceInterface,
  ) {
    this._ContractRepository = contractRepo;
    this._AddressRepository = addressRepository;
    this._VendorRepositroy = vendorRepository;
    this._NotificationService = notificationService;
    this._ChatRoomService = chatRoomService;
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
        phone: selectedAddress?.phone || "",
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
      let response = await this._ChatRoomService.createChatRoom(
        result._id?.toString() as string,
        userId,
      );

      if (!response) {
        throw new ErrorResponse(
          "Failed to create contract",
          StatusCodeEnum.INTERNAL_SERVER_ERROR,
        );
      }
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
  getCustomerContracts = async (
    customerId: string,
    query: { page?: string; limit?: string; search?: string; filter?: string },
  ): Promise<{ data: ContractDto[]; pagination: IPaginationResponseMeta }> => {
    const result = await this._ContractRepository.getCustomerContracts(
      customerId,
      query,
    );
    return {
      data: ContractMapper.toDTOList(result.data),
      pagination: result.pagination,
    };
  };

  /**
   *
   *    get workds  of vendor
   *
   */
  async getVendorContractWorks(
    vendorId: string,
    query: {
      page?: string;
      limit?: string;
      search?: string;
      lat?: number;
      lng?: number;
      distance?: number;
      postedWithin?: string;
    },
  ): Promise<{ data: ContractDto[]; pagination: IPaginationResponseMeta }> {
    const vendorData = await this._VendorRepositroy.vendorDatabyId(vendorId);
    if (!vendorData) {
      throw new ErrorResponse("Vendor not found", StatusCodeEnum.NOT_FOUND);
    }

    if (!vendorData.shopType) {
      throw new ErrorResponse(
        "Vendor service type not found",
        StatusCodeEnum.BAD_REQUEST,
      );
    }

    const result =
      await this._ContractRepository.getVendorWrokWithPaginationAndLocation(
        vendorId,
        vendorData.shopType.toString(),
        {
          page: query.page,
          limit: query.limit,
          search: query.search,
          lat: query.lat,
          lng: query.lng,
          distance: query.distance,
          postedWithin: query.postedWithin || "",
        },
      );

    return {
      data: ContractMapper.toDTOList(result.data),
      pagination: result.pagination,
    };
  }
  /**
   *
   *    apply contracts
   *
   */
  applyForContract = async (
    vendorId: string,
    contractId: string,
  ): Promise<boolean> => {
    const contract = await this._ContractRepository.getContract(contractId);
    let result = await this._ContractRepository.applyForAContract(
      vendorId,
      contractId,
    );
    const vendroData = await this._VendorRepositroy.getEachVendorData(vendorId);

    if (result && contract) {
      const customerId = contract.customerId._id;

      const content = ContractNotificationContentEnum.CONTRACT_APPLIED.replace(
        "{{contractName}}",
        contract.title,
      );

      void this._NotificationService.sendContractNotificationToCustomer(
        customerId.toString(),
        NotificationCategoryEnum.CONTRACT,
        ContractNotificationTypeEnum.CONTRACT_APPLIED,
        ContractNotificationTitleEnum.CONTRACT_APPLIED,
        content,
        contractId,
      );

      return true;
    } else {
      logger.error("error to apply in contract");
      throw new ErrorResponse(
        MessageEnum.SERVER_ERROR,
        StatusCodeEnum.INTERNAL_SERVER_ERROR,
      );
      return false;
    }
  };

  /**
   *
   *   update contract requsts
   *
   */
  handleAppliedVendors = async (
    vendorId: string,
    contractId: string,
    decision: "accept" | "reject",
  ): Promise<boolean> => {

    if (decision == "accept") {
       let result = await this._ContractRepository.acceptVendorForContract(contractId,vendorId)
       if(result){

          let chatRoomResult = await this._ChatRoomService.addMemberToChatRoom(contractId,vendorId,'Vendor','member')
       }
       logger.info('vendor added in contract successfully')
       return true
    } else {
      let result = await this._ContractRepository.removeFromContractRequest(
        contractId,
        vendorId,
      );
      return true;
    }
  };

  /**
   *
   *    get contracts of vendor
   *
   */
}

export default ContractService;
