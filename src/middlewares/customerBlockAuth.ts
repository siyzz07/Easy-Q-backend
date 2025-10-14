import { NextFunction, Request, Response } from "express";
import { CustomerRepository } from "../repositories/customerRepository";
import { MessageEnum } from "../enums/messagesEnum";

export const customerBlockAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerRepo = new CustomerRepository();
    const userId = req.body.userId;

    const customerData = await customerRepo.customerDataById(userId);

    if (!customerData) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!customerData.isActive) {
      return res
        .status(403)
        .json({ message:MessageEnum.ACCOUNT_BLOCKED });
    }

   
    next();
  } catch (error) {
    console.error("Error in customerBlockAuth:", error);
    res.status(500).json({ message: MessageEnum.SERVER_ERROR });
  }
};
