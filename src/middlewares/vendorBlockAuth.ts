import { NextFunction, Request, Response } from "express";

import { MessageEnum } from "../enums/messagesEnum";
import { VendorRepository } from "../repositories/vendorRepository";

export const vendorBlockAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendorRepo = new VendorRepository()
    const userId = req.body.userId;

    const vendorData = await vendorRepo.vendorDatabyId(userId)

    if (!vendorData) {
      return res.status(404).json({ message:MessageEnum.VENDOR_NOT_FOUND });
    }

    if (!vendorData.isActive) {
      return res
        .status(403)
        .json({ message:MessageEnum.ACCOUNT_BLOCKED });
    }

   
    next();
  } catch (error) {
    console.error("Error in customerBlockAuth:", error);
    res.status(500).json({ message:MessageEnum.SERVER_ERROR});
  }
};
