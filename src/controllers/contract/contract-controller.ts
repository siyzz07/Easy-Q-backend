import { NextFunction, Request, Response } from "express";
import { IContractServiceInterface } from "../../interface/contract-interface/contract-service-interface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum"; // Assuming this exists

class ContractController {
    private _contractService: IContractServiceInterface;

    constructor(contractService: IContractServiceInterface) {
        this._contractService = contractService;
    }

    /**
     * 
     *  add new contract
     * 
     */
    addContract = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

 
            const{userId,...data}= req.body
            const result = await this._contractService.addNewContract(userId,data);
            res.status(StatusCodeEnum.OK).json({ message: "Contract created successfully", data: result });
        } catch (error) {
            next(error);
        }
    };

    editContract = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { contractId } = req.params;
            const contractData = req.body;
            const result = await this._contractService.editContract(contractId, contractData);
            res.status(StatusCodeEnum.OK).json({ message: "Contract updated successfully", data: result });
        } catch (error) {
            next(error);
        }
    };

    getContract = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { contractId } = req.params;
            const result = await this._contractService.getContract(contractId);
            res.status(StatusCodeEnum.OK).json({ message: "Contract fetched successfully", data: result });
        } catch (error) {
            next(error);
        }
    };

    getContracts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const filter = req.query;
            const result = await this._contractService.getContracts(filter);
            res.status(StatusCodeEnum.OK).json({ message: "Contracts fetched successfully", data: result });
        } catch (error) {
            next(error);
        }
    };
}

export default ContractController;
