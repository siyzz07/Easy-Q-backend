"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
class AdminService {
    constructor(adminRepo, customerRepo, vendorRepo) {
        /**
         *
         *  Admin dashboard
         *
         */
        this.dashboard = async () => {
            const vendorsData = await this._vendorRepository.getVendorData();
            const customerData = await this._customerRepository.getCusomersData();
            const pendingVendors = vendorsData.reduce((acc, vendor) => {
                if (vendor.isVerified === "pending") {
                    acc += 1;
                }
                return acc;
            }, 0);
            const verifiedVendors = vendorsData.reduce((acc, vendor) => {
                if (vendor.isVerified === "verified") {
                    acc += 1;
                }
                return acc;
            }, 0);
            const rejectedVendors = vendorsData.reduce((acc, vendor) => {
                if (vendor.isVerified === "rejected") {
                    acc += 1;
                }
                return acc;
            }, 0);
            const totalVednors = verifiedVendors + pendingVendors;
            const totalCutomers = customerData.length;
            return {
                totalCutomers,
                totalVednors,
                pendingVendors,
                verifiedVendors,
                rejectedVendors,
            };
        };
        this._adminRepository = adminRepo;
        this._customerRepository = customerRepo;
        this._vendorRepository = vendorRepo;
    }
}
exports.AdminService = AdminService;
