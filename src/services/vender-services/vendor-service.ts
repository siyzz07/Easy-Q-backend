import { MessageEnum } from "../../enums/messagesEnum";
import { IServiceRepository } from "../../interface/service-interface/service-repository-interface";
import { IServiceTypesRepository } from "../../interface/service-types-interface/service-type-repository-interface";
import { IStaffRepository } from "../../interface/staff-interface/staff-repository-interface";
import { IVendorRepository } from "../../interface/vendor-interface/vendor-respository-interface";
import { IVendorShopService } from "../../interface/vendor-interface/vendor-service-interface";
import { IServiceType } from "../../types/adminTypes";
import { IImage, IService, IShopData, IStaff, IVendor } from "../../types/vendorType";
import { ErrorResponse } from "../../utils/errorResponse";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import logger from "../../utils/logger";
import { deleteCloudinaryImage } from "../../utils/cloudinary";
import { IPaginationResponseMeta } from "../../types/common-types";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";
import { VendorMapper } from "../../mappers/vendor-mapper/vendor-mapper";

import { IBookingRopsitory } from "../../interface/booking-interface/booking-repository-interface";
import { IContractRepository } from "../../interface/contract-interface/contract-respositlory-interface";

class VendorService implements IVendorShopService {
  private _vendorRepo: IVendorRepository;
  private _staffRepo:IStaffRepository
  private _serviceTypesRepo:IServiceTypesRepository
  private _serviceRepo :IServiceRepository
  private _bookingRepo: IBookingRopsitory
  private _contractRepo: IContractRepository

  constructor(
    vendorRepo: IVendorRepository,
    staffRepo:IStaffRepository,
    serviceTypes:IServiceTypesRepository,
    serviceRepo:IServiceRepository,
    bookingRepo: IBookingRopsitory,
    contractRepo: IContractRepository
  ) {
    this._vendorRepo = vendorRepo;
    this._staffRepo= staffRepo
    this._serviceTypesRepo=serviceTypes
    this._serviceRepo = serviceRepo
    this._bookingRepo = bookingRepo
    this._contractRepo = contractRepo
  }


  //----------------------------------------- add shop extra data
  addShopData = async (
    data: IShopData,
    vendorId: string,
    coordinates: { lat: number; lon: number },
    workingDays:string
  ): Promise<any> => {
    try {
      const days = workingDays.split(',')

      const location = {
        type: "Point",
        coordinates: [coordinates.lon, coordinates.lat],
      };

      const updateData = {
        ...data,
        workingDays:days,
        location,
        hasShop:true
      };

      const vendorData = await this._vendorRepo.vendorDatabyId(vendorId);
      if (vendorData) {
        const response = await this._vendorRepo.findByIdAndUpdate(
          vendorId,
          updateData
        );
        if (!response) {
          throw new Error(MessageEnum.SHOP_DATA_ADDED_FAILED);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message == MessageEnum.SHOP_DATA_ADDED_FAILED) {
          throw error;
        } else {
          logger.error("server error for adding show data");
        }
      } else {
        logger.error("server error for adding show data");
      }
    }
  };


   //----------------------------------------- get shop data
  getShopData = async (id: string): Promise<VendorDto> =>{
    
     const data = await this._vendorRepo.vendorDatabyId(id)
    
     if(data){
         return VendorMapper.toDTO(data)
     }
     throw new ErrorResponse(MessageEnum.VENDOR__DATA_FETCH_FAILED, StatusCodeEnum.NOT_FOUND)

  }

   //----------------------------------------- add shop extra data
   getShopTypes = async(): Promise<IServiceType[] | []> => {

     const data = await this._serviceTypesRepo.vendorTypeData()

     if(data){
      return data
     }else{
      return []
     }
   }


  //----------------------------------------- vendor dashboard
  getDashboard = async (data: string, year?: number): Promise<any> => {
    const shopId= data
    const currentYear = year || new Date().getFullYear();


    const staffData = await this._staffRepo.getStaffData(shopId)
    const serviceData = await this._serviceRepo.getServiceData(shopId)
    const bookingStats = await this._bookingRepo.getBookingStats(shopId, currentYear);
    const contractStats = await this._contractRepo.getContractStats(shopId, currentYear);
    const weeklyBookingStats = await this._bookingRepo.getWeeklyBookingStats(shopId);
    

    const totalStaff = staffData.length
    const availableStaff = staffData.reduce((acc:number,data:IStaff)=>{
        if(data.isActive ){
          acc+=1
        }
        return acc
    },0)

    const totalUnavailableStaff =staffData.reduce((acc:number,data:IStaff)=>{
        if(!data.isActive ){
          acc+=1
        }
        return acc
    },0)


    const totalService = serviceData.length
    const totalAvailableService = serviceData.reduce((acc:number,data:IService) =>{
      if(data.isActive){
        acc+=1
      }
      return acc
    },0)

    const totalUnavailableService = serviceData.reduce((acc:number,data:IService) =>{
      if(!data.isActive){
        acc+=1
      }
      return acc
    },0)
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const chartData = months.map((month, index) => {
        const monthNum = index + 1;
        const booking = bookingStats.find((b: any) => b._id === monthNum);
        const contract = contractStats.find((c: any) => c._id === monthNum);
        return {
            month: month,
            bookings: booking ? booking.count : 0,
            contracts: contract ? contract.count : 0
        };
    });

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyChartData = days.map((day, index) => {
      const dayNum = index + 1;
      const booking = weeklyBookingStats.find((b: any) => b._id === dayNum);
      return {
        day: day,
        bookings: booking ? booking.count : 0,
        revenue: booking ? booking.revenue : 0,
      };
    });

    const extraStats = await this._bookingRepo.getVendorRevenueAndCustomerCount(shopId);
    const detailedAnalytics = await this._bookingRepo.getDetailedVendorAnalytics(shopId);

    return {
      totalStaff,
      availableStaff,
      totalUnavailableStaff,
      totalService,
      totalAvailableService,
      totalUnavailableService,
      totalRevenue: extraStats.totalRevenue,
      customerCount: extraStats.customerCount,
      pendingBookingsCount: extraStats.pendingBookings,
      chartData, 
      weeklyChartData,
      ...detailedAnalytics
    }

  }



  
  //----------------------------------------- update vendor

  updateVendor = async( _id: string,workingDays:string,data:IVendor): Promise<boolean | void> => {
    
   
   const days = workingDays.split(',')
   const updateData = {
     ...data,
     workingDays:days,
     };

    const result = await this._vendorRepo.findByIdAndUpdate(_id as string,updateData)
      if(result){
        return true
      }else{
        throw new ErrorResponse(MessageEnum.VENDOR_DATA_UPDATION_FAILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
      }
  }


  //===============================================================




   getEachVendorData = async (data: string): Promise<VendorDto | void>  => {
    
    const result = await this._vendorRepo.getEachVendorData(data)
    if(result){
      return VendorMapper.toDTO(result)
    }else{
      throw new Error(MessageEnum.VENDOR__DATA_FETCH_FAILED)
    }
    
  }


   getVendorsData = async (data:{search?:string,location?:string,page?:string,limit?:string, latitude?:number, longitude?:number, categories?:string[],ratings?:string[]}): Promise<{data:VendorDto[],pagination: IPaginationResponseMeta}> => {


        const response = await this._vendorRepo.vendorsDataWithPagination(data)

        if(response){
          logger.info('vendor data fetch successfully')
        }else{
          throw new ErrorResponse (MessageEnum.VENDOR__DATA_FETCH_FAILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
        }

        const activeShops = (response.data || [] ).filter((shop)=> shop.hasShop == true && shop.isActive==true)
        return {data: VendorMapper.toDTOList(activeShops) , pagination:response.pagination};
    
    };


    //---------------------------- add shop image
    addShopImages = async (datas: { data: IImage[]; userId: string; }): Promise<boolean | void> => {
       const {userId,data} = datas
       const result = await this._vendorRepo.addImage(userId,data)
       if(result){
        logger.info('shop image added success')
        return true
       }else{
        logger.error('shop image adding failed')
        throw new ErrorResponse(MessageEnum.SERVER_ERROR,StatusCodeEnum.INTERNAL_SERVER_ERROR)
       }
    }

    //---------------------------- remove shop image
   removeImage = async (data: { publicId: string; image_id: string; userId: string; }): Promise<boolean| void> => {
      const {publicId,image_id,userId} = data
        const result = await deleteCloudinaryImage(publicId)

        if(result){

            const response = await this._vendorRepo.deleteShopImage(userId,image_id)

            if(response){
              logger.info('image deleted successfull')
              return true
            }
              logger.error('error to remove shop image')
              throw new ErrorResponse(MessageEnum.VENDOR_SHOP_IMAGE_DELETED_FAILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
            }else{
              logger.error('error to remove shop image')
              
              throw new ErrorResponse(MessageEnum.VENDOR_SHOP_IMAGE_DELETED_FAILED,StatusCodeEnum.INTERNAL_SERVER_ERROR)
        }
   }

}

export default VendorService;
