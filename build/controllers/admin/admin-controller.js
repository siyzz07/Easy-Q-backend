"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const httpStatusCodeEnum_1 = require("../../enums/httpStatusCodeEnum");
const messagesEnum_1 = require("../../enums/messagesEnum");
class AdminController {
    constructor(adminService) {
        //----------------------------------------------------------admin dashboard
        this.dashboardData = async (req, res, next) => {
            try {
                const result = await this._adminService.dashboard();
                res.status(httpStatusCodeEnum_1.StatusCodeEnum.OK).json({
                    totalCutomers: result.totalCutomers,
                    totalVednors: result.totalVednors,
                    pendingVendors: result.pendingVendors,
                    verifiedVendors: result.verifiedVendors,
                    rejectedVendors: result.rejectedVendors,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res
                        .status(httpStatusCodeEnum_1.StatusCodeEnum.INTERNAL_SERVER_ERROR)
                        .json({ message: messagesEnum_1.MessageEnum.SERVER_ERROR });
                }
            }
        };
        this._adminService = adminService;
    }
}
exports.AdminController = AdminController;
