import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

import { IStaffRepositoryInterface } from "../../interface/staff-interface/staff-repository-interface";
import { IStaffServiceInterface } from "../../interface/staff-interface/staff-service-interface";
import { IStaff, IStaffAdd } from "../../types/vendorType";
import { ErrorResponse } from "../../utils/errorResponse";
import logger from "../../utils/logger";

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
      closingTime,
      breaks
    } = { ...data };

    const shopData: IStaff = {
      shopId: userId,
      staffName,
      openingTime,
      closingTime,
      breaks,
      isActive: true,
      bookingTimes:openingTime,
      blockedDates:[],
    };

    const staffExist = await this._StaffRepository.getSingleStaff(
      userId,
      staffName
    );

    if (staffExist) {
      throw new ErrorResponse(MessageEnum.STAFF_ALREADY_EXISTS,StatusCodeEnum.CONFLICT)
    }

    const result = await this._StaffRepository.addStaff(shopData);

    if (result) {
      return true;
    } else {
      throw new ErrorResponse(MessageEnum.STAFF_ADD_FAILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
    }
  };

  // ---------------------------------- get staffs
  getStaffService = async (shopId: string): Promise<IStaff[] | []> => {
    const data = await this._StaffRepository.getStaff(shopId);
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

    const exist = await this._StaffRepository.duplicateStaffFind(
      userId as string,
      staffName,
      _id
    );

    if (exist.length) {
      throw new ErrorResponse(MessageEnum.STAFF_ALREADY_EXISTS,StatusCodeEnum.CONFLICT)
    } else {
      const values = {
        ...payload,
        staffName,
      };

      const result = await this._StaffRepository.editStaff(
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


  //  ---------------------------------- edit staff bookin blok dates
  editStaffBlockDate = async (data: { _id: string; blockedDates:any; userId: string; }): Promise<boolean | void> =>{

    const{_id,blockedDates,userId} = data
    
    let result = await this._StaffRepository.editStaff(userId,_id,{blockedDates})
     
    if(result){
      return true
    }else{
      logger.error('error to edit the staff booking blokc dates')
      throw new ErrorResponse(MessageEnum.STAFF_UPDATE_FAILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
    }


  }
}
