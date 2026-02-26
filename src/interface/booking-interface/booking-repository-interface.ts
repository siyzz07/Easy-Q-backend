import { IBooking, IBookingPopulated, IPaginationResponseMeta } from "../../types/common-types";
import { AdminBookingStats, MonthlyData, PeakHour, PlatformStatusBreakdown, TopService, TopVendor } from "../../types/adminType";
import { IMonthlyStats, IWeeklyStats, IVendorRevenueStats, IDetailedVendorAnalytics } from "../../types/statsTypes";

export interface IBookingRopsitory {
    addNewBooking(data: Partial<IBooking>): Promise<IBooking|void>;
    getBookedDatasByCondition (data:object):Promise<IBooking[]>
    getEachBookingDataById (_id:string):Promise<IBookingPopulated|void>
    updateBooking (id:string , data:Partial<IBooking>):Promise<IBooking|void>
    bookingDatas (data:string ,query:{page?:string,limit?:string,search?:string}) :Promise<{data:IBookingPopulated[],pagination:IPaginationResponseMeta}>
    bookingDatasForVendor (data:string ,query:{page?:string,limit?:string,search?:string, date?:string}) :Promise<{data:IBookingPopulated[],pagination:IPaginationResponseMeta}>
    getBookingStats(vendorId: string, year: number): Promise<IMonthlyStats[]>
    getWeeklyBookingStats(vendorId: string): Promise<IWeeklyStats[]>
    getAdminBookingStats(): Promise<AdminBookingStats>
    getAdminMonthlyRevenueStats(year: number): Promise<MonthlyData[]>
    getAdminPlatformStatusBreakdown(): Promise<PlatformStatusBreakdown[]>
    getAdminTopVendors(limit: number): Promise<TopVendor[]>
    getAdminTopServices(limit: number): Promise<TopService[]>
    getAdminPeakHours(): Promise<PeakHour[]>
    getVendorRevenueAndCustomerCount(vendorId: string): Promise<IVendorRevenueStats>
    getDetailedVendorAnalytics(vendorId: string): Promise<IDetailedVendorAnalytics>
}