"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorBlockAuth = void 0;
const messagesEnum_1 = require("../enums/messagesEnum");
const vendorRepository_1 = require("../repositories/vendorRepository");
const vendorBlockAuth = async (req, res, next) => {
    try {
        const vendorRepo = new vendorRepository_1.VendorRepository();
        const userId = req.body.userId;
        const vendorData = await vendorRepo.vendorDatabyId(userId);
        if (!vendorData) {
            return res.status(404).json({ message: messagesEnum_1.MessageEnum.VENDOR_NOT_FOUND });
        }
        if (!vendorData.isActive) {
            return res
                .status(403)
                .json({ message: messagesEnum_1.MessageEnum.ACCOUNT_BLOCKED });
        }
        next();
    }
    catch (error) {
        console.error("Error in customerBlockAuth:", error);
        res.status(500).json({ message: messagesEnum_1.MessageEnum.SERVER_ERROR });
    }
};
exports.vendorBlockAuth = vendorBlockAuth;
