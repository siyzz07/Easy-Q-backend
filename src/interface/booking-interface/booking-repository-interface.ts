import { IBooking, IBookingPopulated, IPaginationResponseMeta } from "../../types/common-types";



export interface IBookingRopsitoryInterface {
    addNewBooking(data: Partial<IBooking>): Promise<IBooking|void>;
    getBookedDatasByCondition (data:object):Promise<IBooking[]>
    getEachBookingDataById (_id:string):Promise<IBookingPopulated|void>
    updateBooking (id:string , data:Partial<IBooking>):Promise<IBooking|void>
    bookingDatas (data:string ,query:{page?:string,limit?:string,search?:string}) :Promise<{data:IBookingPopulated[],pagination:IPaginationResponseMeta}>
    bookingDatasForVendor (data:string ,query:{page?:string,limit?:string,search?:string, date?:string}) :Promise<{data:IBookingPopulated[],pagination:IPaginationResponseMeta}>
    getBookingStats(vendorId: string, year: number): Promise<any>
    getWeeklyBookingStats(vendorId: string): Promise<any>
    getAdminBookingStats(): Promise<any>
    getAdminMonthlyRevenueStats(year: number): Promise<any>
    getAdminPlatformStatusBreakdown(): Promise<any>
    getAdminTopVendors(limit: number): Promise<any>
    getAdminTopServices(limit: number): Promise<any>
    getAdminPeakHours(): Promise<any>
    getVendorRevenueAndCustomerCount(vendorId: string): Promise<any>
    getDetailedVendorAnalytics(vendorId: string): Promise<any>
}