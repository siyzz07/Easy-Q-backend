"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerBlockAuth = void 0;
const customerRepository_1 = require("../repositories/customerRepository");
const messagesEnum_1 = require("../enums/messagesEnum");
const customerBlockAuth = async (req, res, next) => {
    try {
        const customerRepo = new customerRepository_1.CustomerRepository();
        const userId = req.body.userId;
        const customerData = await customerRepo.customerDataById(userId);
        if (!customerData) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!customerData.isActive) {
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
exports.customerBlockAuth = customerBlockAuth;
