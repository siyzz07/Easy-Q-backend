import { IContractRepositoryInterface } from "../../interface/contract-interface/contract-respositlory-interface";
import { IContractServiceInterface } from "../../interface/contract-interface/contract-service-interface";
import { ContractDto } from "../../dto/contract-dto/contract-dto";
import { ContractMapper } from "../../mappers/contract-mapper/contract-mapper";
import {
  IAddContracValues,
  IContract,
  IPaginationMeta,
  IPaginationResponseMeta,
  IUpdateContractValues,
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
import { log } from "winston";

class ContractService implements IContractServiceInterface {
  private _ContractRepository: IContractRepositoryInterface;
  private _AddressRepository: ICustomerAddressRepositoryInterface;
  private _VendorRepositroy: IVendorRepo;
  private _NotificationService!: INotificationServiceInterface;
  private _ChatRoomService!: IChatRoomServiceInterface;

  constructor(
    contractRepo: IContractRepositoryInterface,
    addressRepository: ICustomerAddressRepositoryInterface,
    vendorRepository: IVendorRepo,
    notificationService?: INotificationServiceInterface,
    chatRoomService?: IChatRoomServiceInterface,
  ) {
    this._ContractRepository = contractRepo;
    this._AddressRepository = addressRepository;
    this._VendorRepositroy = vendorRepository;
    if (notificationService) this._NotificationService = notificationService;
    if (chatRoomService) this._ChatRoomService = chatRoomService;
  }

  public setNotificationService(
    notificationService: INotificationServiceInterface,
  ) {
    this._NotificationService = notificationService;
  }

  public setChatRoomService(chatRoomService: IChatRoomServiceInterface) {
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

    console.log("reached add contract -service");

    const addressesData = await this._AddressRepository.getAllAddress(userId);
    const selectedAddress = addressesData?.address.find(
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
        _id: address,
        address: selectedAddress?.address || "",
        city: selectedAddress?.city || "",
        state: selectedAddress?.state || "",
        country: selectedAddress?.country || "",
        phone: phone || "",
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
    console.log("11");

    const result =
      await this._ContractRepository.addNewContract(contractPayload);
    console.log("12");

    if (result) {
      console.log("13");
      const response = await this._ChatRoomService.createChatRoom(
        result._id?.toString() as string,
        userId,
      );
      console.log("14");

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
    userId: string,
    contractData: IUpdateContractValues,
  ): Promise<boolean | null> {
    let {
      contractName,
      description,
      phone,
      address,
      serviceType,
      isHiring,
      status,
    } = contractData;

    const getContractData =
      await this._ContractRepository.getContract(contractId);

    if (getContractData?.status == ContractStatusEnum.COMPLETED) {
      throw new ErrorResponse(
        MessageEnum.CONTRACT_EDIT_COMPLETED_DENIED,
        StatusCodeEnum.BAD_REQUEST,
      );
    }

    if (getContractData?.status == ContractStatusEnum.CANCELLED) {
      throw new ErrorResponse(
        MessageEnum.CONTRACT_EDIT_NOT_ALLOWED_CANCELLED,
        StatusCodeEnum.BAD_REQUEST,
      );
    }

    if (
      status == ContractStatusEnum.CANCELLED ||
      status == ContractStatusEnum.COMPLETED
    ) {
      isHiring = false;
    }

    const addressesData = await this._AddressRepository.getAllAddress(userId);
    const selectedAddress = addressesData?.address.find(
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
      address: {
        _id: address,
        address: selectedAddress?.address || "",
        city: selectedAddress?.city || "",
        state: selectedAddress?.state || "",
        country: selectedAddress?.country || "",
        phone: phone || "",
      },
      title: contractName,
      description: description,
      service: new mongoose.Types.ObjectId(serviceType),
      location,
      status,
      isHiring,
    };

    const result = await this._ContractRepository.editContract(
      contractId,
      contractPayload,
    );
    if (result) {
      return true;
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
      filter: string;
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
          postedWithin: query.filter,
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
    const result = await this._ContractRepository.applyForAContract(
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
      const result = await this._ContractRepository.acceptVendorForContract(
        contractId,
        vendorId,
      );
      if (result) {
        const chatRoomResult = await this._ChatRoomService.addMemberToChatRoom(
          contractId,
          vendorId,
          "Vendor",
          "member",
        );
      }
      logger.info("vendor added in contract successfully");
      return true;
    } else {
      const result = await this._ContractRepository.removeFromContractRequest(
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
  getVendorContracts = async (
    vendorId: string,
    query: { page?: string; limit?: string; search?: string },
  ): Promise<{ data: ContractDto[]; pagination: IPaginationResponseMeta }> => {
    const result = await this._ContractRepository.getVendorContracts(
      vendorId,
      query,
    );
    return {
      data: ContractMapper.toDTOList(result.data),
      pagination: result.pagination,
    };
  };

  /**
   *
   *    remove from contract
   *
   */
  removeFromContract = async (
    vendorId: string,
    contractId: string,
  ): Promise<boolean | void> => {
    const [contract, chatRoom] = await Promise.all([
      this._ContractRepository.removeRomAcceptedVendor(contractId, vendorId),
      this._ChatRoomService.removeMember(contractId, vendorId),
    ]);
    const contractData = await this._ContractRepository.getContract(contractId);

    const content = ContractNotificationContentEnum.CONTRACT_REMOVED.replace(
      "{{contractName}}",
      contractData?.title as string,
    );
    if (contract && chatRoom) {
      void this._NotificationService.sendContractNotificationToVendor(
        vendorId.toString(),
        NotificationCategoryEnum.CONTRACT,
        ContractNotificationTypeEnum.CONTRACT_REJECTED,
        ContractNotificationTitleEnum.CONTRACT_REJECTED,
        content,
        contractId,
      );
      return true;
    } else {
      throw new ErrorResponse(
        MessageEnum.CONTRACT_UPDATE_FAILED,
        StatusCodeEnum.INTERNAL_SERVER_ERROR,
      );
    }
  };
}

export default ContractService;
