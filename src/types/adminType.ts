
export interface MonthlyData {
  _id: number;
  count: number;
  revenue?: number;
}

export interface AdminBookingStats {
  totalRevenue: number;
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;
}

export interface AdminContractStats {
  totalContracts: number;
  openContracts: number;
  completedContracts: number;
  cancelledContracts: number;
}

export interface PlatformStatusBreakdown {
  status: string;
  count: number;
}

export interface TopVendor {
  _id: string;
  revenue: number;
  bookings: number;
  shopName: string;
  email: string;
}

export interface TopService {
  _id: string;
  name: string;
  count: number;
  revenue: number;
}

export interface PeakHour {
  hour: number;
  count: number;
}

export interface AdminDashboardDashboardResponse {
  totalCustomers: number;
  totalVendors: number;
  pendingVendors: number;
  verifiedVendors: number;
  rejectedVendors: number;
  bookingStats: AdminBookingStats;
  contractStats: AdminContractStats;
  platformStatusBreakdown: PlatformStatusBreakdown[];
  topVendors: TopVendor[];
  topServices: TopService[];
  peakHours: PeakHour[];
  revenueChartData: Array<{
    month: string;
    revenue: number;
    bookings: number;
  }>;
  userGrowthChartData: Array<{
    month: string;
    customers: number;
    vendors: number;
  }>;
}
