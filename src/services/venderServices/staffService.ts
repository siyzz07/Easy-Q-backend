import { MessageEnum } from "../../enums/messagesEnum";
import { IServiceTypesRepositoryInterface } from "../../interface/repositoryInterface/adminRepoInterface";
import { IStaffRepositoryInterface } from "../../interface/repositoryInterface/vendorRepoInterface";
import { IShopTypeServiceInterface } from "../../interface/serviceInterface/adminServiceInterface";
import { IStaffServiceInterface } from "../../interface/serviceInterface/vendorServiceInterface";
import { IStaff, IStaffAdd } from "../../types/vendorType";

export class StaffService implements IStaffServiceInterface {
  private _StaffRepository: IStaffRepositoryInterface;

  constructor(staffReopository: IStaffRepositoryInterface) {
    this._StaffRepository = staffReopository;
  }

  // ---------------------------------- add new Staff
  addNewStaff = async (
    userId: string,
    data: IStaffAdd
  ): Promise<boolean | void> => {
    const {
      staffName,
      openingTime,
      breakEndTime,
      closingTime,
      breakStartTime,
    } = { ...data };

    let shopData: IStaff = {
      shopId: userId,
      staffName,
      openingTime,
      breakEndTime,
      closingTime,
      breakStartTime,
      isActive: true,
      bookingTimes:openingTime,
      bookingBlocks: [],
    };

    let staffExist = await this._StaffRepository.getSingleStaff(
      userId,
      staffName
    );

    if (staffExist) {
      throw new Error(MessageEnum.STAFF_ALREADY_EXISTS);
    }

    let result = await this._StaffRepository.addStaff(shopData);

    if (result) {
      return true;
    } else {
      throw new Error(MessageEnum.STAFF_ADD_FAILED);
    }
  };

  // ---------------------------------- get staffs
  getStaffService = async (shopId: string): Promise<IStaff[] | []> => {
    let data = await this._StaffRepository.getStaff(shopId);
    if (data) {
      return data;
    } else {
      return [];
    }
  };

  //  ---------------------------------- edit Staff
  editStaff = async (data: IStaff): Promise<boolean | void> => {
    const { userId, _id, staffName, ...payload } = { ...data };
    console.log(payload);

    let exist = await this._StaffRepository.duplicateStaffFind(
      userId as string,
      staffName,
      _id
    );

    if (exist.length) {
      throw new Error(MessageEnum.STAFF_ALREADY_EXISTS);
    } else {
      let values = {
        ...payload,
        staffName,
      };

      let result = await this._StaffRepository.editStaff(
        userId as string,
        _id as string,
        values
      );
      if (result) {
        return result;
      } else {
        return false;
      }
    }
  };
}
