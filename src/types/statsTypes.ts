import { IBookingPopulated } from "./common-types";

export interface IMonthlyStats {
  _id: number;
  count: number;
}

export interface IWeeklyStats {
  _id: number;
  count: number;
  revenue: number;
}

export interface IVendorRevenueStats {
  totalRevenue: number;
  customerCount: number;
  pendingBookings: number;
}

export interface IServiceStats {
  _id: string;
  count: number;
  revenue: number;
  name: string;
}

export interface IStaffPerformance {
  _id: string;
  count: number;
  revenue: number;
  name: string;
}

export interface IStatusBreakdown {
  status: string;
  count: number;
}

export interface IAdminPeakHour {
  hour: number;
  count: number;
}

export interface IDetailedVendorAnalytics {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  completionRate: number;
  topServices: IServiceStats[];
  recentBookings: IBookingPopulated[]; 
  staffPerformance: IStaffPerformance[];
  statusBreakdown: IStatusBreakdown[];
  peakHours: IAdminPeakHour[];
}

export interface IDashboardChartData {
  month: string;
  bookings: number;
  contracts: number;
}

export interface IWeeklyDashboardChartData {
  day: string;
  bookings: number;
  revenue: number;
}

export interface IVendorDashboardData extends IDetailedVendorAnalytics {
  totalStaff: number;
  availableStaff: number;
  totalUnavailableStaff: number;
  totalService: number;
  totalAvailableService: number;
  totalUnavailableService: number;
  pendingBookingsCount: number;
  customerCount: number;
  chartData: IDashboardChartData[];
  weeklyChartData: IWeeklyDashboardChartData[];
}

export interface IAdminBookingStats {
  totalRevenue: number;
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;
}

export interface IAdminMonthlyRevenueStats {
  _id: number;
  revenue: number;
  count: number;
}

export interface IAdminTopVendor {
    _id: string;
    revenue: number;
    bookings: number;
    shopName: string;
    email: string;
}

export interface IAdminTopService {
    _id: string;
    name: string;
    count: number;
    revenue: number;
}
export interface IAdminRevenueChartData {
  month: string;
  revenue: number;
  bookings: number;
}

export interface IAdminUserGrowthChartData {
  month: string;
  customers: number;
  vendors: number;
}

export interface IAdminContractStats {
  totalContracts: number;
  openContracts: number;
  completedContracts: number;
  cancelledContracts: number;
}

export interface IAdminDashboardData {
  totalCustomers: number;
  totalVendors: number;
  pendingVendors: number;
  verifiedVendors: number;
  rejectedVendors: number;
  bookingStats: IAdminBookingStats;
  contractStats: IAdminContractStats;
  platformStatusBreakdown: IStatusBreakdown[];
  topVendors: IAdminTopVendor[];
  topServices: IAdminTopService[];
  peakHours: IAdminPeakHour[];
  revenueChartData: IAdminRevenueChartData[];
  userGrowthChartData: IAdminUserGrowthChartData[];
}
