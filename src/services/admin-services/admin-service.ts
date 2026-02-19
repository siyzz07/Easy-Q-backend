import { IAdminService } from "../../interface/admin-interface/admin-service-interface";
import { ICustomerRepository } from "../../interface/customer-interface/customer-repository-interface";
import { IVendorRepository } from "../../interface/vendor-interface/vendor-respository-interface";
import { IBookingRopsitory } from "../../interface/booking-interface/booking-repository-interface";
import { IContractRepository } from "../../interface/contract-interface/contract-respositlory-interface";
import { IVendor } from "../../types/vendorType";
import { CustomerDto } from "../../dto/customer-dto/customer-dto";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";
import { CustomerMapper } from "../../mappers/customer-mapper/customer-mapper";
import { VendorMapper } from "../../mappers/vendor-mapper/vendor-mapper";
import { IPaginationResponseMeta } from "../../types/common-types";

export class AdminService implements IAdminService {
  private _customerRepository: ICustomerRepository;
  private _vendorRepository: IVendorRepository;
  private _bookingRepository: IBookingRopsitory;
  private _contractRepository: IContractRepository;

  constructor(
    customerRepo: ICustomerRepository,
    vendorRepo: IVendorRepository,
    bookingRepo: IBookingRopsitory,
    contractRepo: IContractRepository
  ) {
    this._customerRepository = customerRepo;
    this._vendorRepository = vendorRepo;
    this._bookingRepository = bookingRepo;
    this._contractRepository = contractRepo;
  }



  /**
   * 
   *  Admin dashboard
   * 
   */
  dashboard = async (): Promise<any> => {
    const vendorsData = await this._vendorRepository.getVendorData();
    const customerData = await this._customerRepository.getCusomersData();
    const bookingStats = await this._bookingRepository.getAdminBookingStats();
    const contractStats = await this._contractRepository.getAdminContractStats();
    const platformStatusBreakdown = await this._bookingRepository.getAdminPlatformStatusBreakdown();
    const topVendors = await this._bookingRepository.getAdminTopVendors(5);
    const topServices = await this._bookingRepository.getAdminTopServices(5);
    const peakHours = await this._bookingRepository.getAdminPeakHours();
    
    // Get analytics for current year
    const year = new Date().getFullYear();
    const monthlyRevenue = await this._bookingRepository.getAdminMonthlyRevenueStats(year);
    const customerGrowth = await this._customerRepository.getMonthlyUserGrowth(year);
    const vendorGrowth = await this._vendorRepository.getMonthlyUserGrowth(year);

    const pendingVendors = vendorsData.reduce((acc: number, vendor: IVendor) => {
      if (vendor.isVerified === "pending") acc += 1;
      return acc;
    }, 0);

    const verifiedVendors = vendorsData.reduce((acc: number, vendor: IVendor) => {
      if (vendor.isVerified === "verified") acc += 1;
      return acc;
    }, 0);

    const rejectedVendors = vendorsData.reduce((acc: number, vendor: IVendor) => {
      if (vendor.isVerified === "rejected") acc += 1;
      return acc;
    }, 0);

    const totalVendors = verifiedVendors + pendingVendors;
    const totalCustomers = customerData.length;

    // Prepare monthly data for charts
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const revenueChartData = months.map((month, index) => {
      const monthNum = index + 1;
      const data = monthlyRevenue.find((m: any) => m._id === monthNum);
      return {
        month,
        revenue: data ? data.revenue : 0,
        bookings: data ? data.count : 0
      };
    });

    const userGrowthChartData = months.map((month, index) => {
       const monthNum = index + 1;
       const cData = customerGrowth.find((m: any) => m._id === monthNum);
       const vData = vendorGrowth.find((m: any) => m._id === monthNum);
       return {
         month,
         customers: cData ? cData.count : 0,
         vendors: vData ? vData.count : 0
       };
    });

    return {
      totalCustomers,
      totalVendors,
      pendingVendors,
      verifiedVendors,
      rejectedVendors,
      bookingStats,
      contractStats,
      platformStatusBreakdown,
      topVendors,
      topServices,
      peakHours,
      revenueChartData,
      userGrowthChartData
    };
  };

  // ------------------------- Customer Management -------------------------
  
  getCustomers = async (): Promise<CustomerDto[]> => {
    const result = await this._customerRepository.getCusomersData();
    return CustomerMapper.toDTOList(result);
  }

  blockCustomer = async (id: string): Promise<void> => {
    await this._customerRepository.blockCustomer(id);
  }

  // ------------------------- Vendor Management -------------------------

  getVendors = async (): Promise<VendorDto[]> => {
    const result = await this._vendorRepository.getVendorData();
    return VendorMapper.toDTOList(result);
  }


  getVendorsPagination = async(query: { page?: string; limit?: string; search?: string; }): Promise<{ data: IVendor[]; pagination: IPaginationResponseMeta }> =>{
    
    const result = await this._vendorRepository.getVendorDataPaginaition(query)
    return result
  }

  blockVendor = async (id: string): Promise<void> => {
    await this._vendorRepository.blockVendor(id);
  }

  getPendingVendors = async (): Promise<VendorDto[]> => {
    const vendors = await this._vendorRepository.getVendorData();
    const pending = vendors.filter((v) => v.isVerified === "pending");
    return VendorMapper.toDTOList(pending);
  }

  verifyVendor = async (id: string): Promise<void> => {
    await this._vendorRepository.verifyVendor(id);
  }

  rejectVendor = async (id: string): Promise<void> => {
    await this._vendorRepository.rejectVendor(id);
  }

}
