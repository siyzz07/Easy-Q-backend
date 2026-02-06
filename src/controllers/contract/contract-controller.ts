import { NextFunction, Request, Response } from "express";
import { IContractServiceInterface } from "../../interface/contract-interface/contract-service-interface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum"; 


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
  addContract = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { userId, ...data } = req.body;
      console.log('reach add contract controller');
      
      const result = await this._contractService.addNewContract(userId, data);
      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.CONTRACT_CREATED, data: result });
    } catch (error) {
      next(error);
    }
  };

  editContract = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
      const { contractId } = req.params;
      const contractData = req.body;
      const userId = req.body.userId
      const result = await this._contractService.editContract(
        contractId,
        userId,
        contractData,
      );
      res
        .status(StatusCodeEnum.OK)
        .json({ success:true, message: MessageEnum.CONTRACT_UPDATED });
 
  };

  getContract = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { contractId } = req.params;
      const result = await this._contractService.getContract(contractId);
      res
        .status(StatusCodeEnum.OK)
        .json({ message: MessageEnum.CONTRACT_FETCH_SUCCESS, data: result });
    } catch (error) {
      next(error);
    }
  };

  getContracts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const filter = req.query;
      const result = await this._contractService.getContracts(filter);
      res
        .status(StatusCodeEnum.OK)
        .json({ message:MessageEnum.CONTRACT_FETCH_SUCCESS, data: result });
    } catch (error) {
      next(error);
    }
  };

  /**
   *
   *  get customer contract
   *
   */
  getCustomerContract = async (req: Request, res: Response): Promise<void> => {
    const result = await this._contractService.getCustomerContracts(
      req.body.userId,
      req.query,
    );
    res
      .status(StatusCodeEnum.OK)
      .json({
        success: true,
        message: MessageEnum.CONTRACT_FETCH_SUCCESS,
        data: result.data,
        pagination: result.pagination,
      });
  };

  /**
   *
   *  get vendor works ------- vendor can see the available works  // from there he can apply that work
   *
   */

  getWorks = async (req: Request, res: Response): Promise<void> => {
    const query = req.query;
    const vendorId = req.body.userId;

    const result = await this._contractService.getVendorContractWorks(
      vendorId,
      query,
    );

    res
      .status(StatusCodeEnum.OK)
      .json({
        success: true,
        message: MessageEnum.CONTRACT_FETCH_SUCCESS,
        data: result.data,
        pagination: result.pagination,
      });
  };

  /**
   *
   *  apply for a contract
   *
   */
  applyContract = async (req: Request, res: Response): Promise<void> => {
    const vendorId = req.body.userId;
    const contractId = req.params.contractId;
    const result = await this._contractService.applyForContract(
      vendorId,
      contractId,
    );

    if (result) {
      res
        .status(StatusCodeEnum.OK)
        .json({ success: true, message: MessageEnum.CONTRACT_APPLIED });
    }
  };

  /**
   *
   *  update applied vendors - reject or accep
   *
   */
  updateVendorContractRequest = async (req: Request, res: Response) => {
    const vendorId = req.body.vendorId;
    const decision = req.body.decision;
    const contractId = req.body.contractId;

    const result = await this._contractService.handleAppliedVendors(
      vendorId,
      contractId,
      decision,
    );

    if (result) {
      res
        .status(StatusCodeEnum.OK)
        .json({ success: true, message: MessageEnum.CONTRACT_UPDATED });
    }
  };

  /**
   *
   *  get vendors accepted contracts
   *
   */
  getVendorContracts = async(req:Request,res:Response):Promise<void> =>{

    const vendorId = req.body.userId
    const query = req.query

    const reuslt = await this._contractService.getVendorContracts(vendorId,query)
    if(reuslt){
        res 
        .status(StatusCodeEnum.OK)
        .json({success:true , message:MessageEnum.CONTRACT_FETCH_SUCCESS , data:reuslt.data , pagination:reuslt.pagination})
    }

  }

  /**
   *
   *  remove vendor from the accepted contract
   *
   */
  removeVendorFromContract = async (req:Request,res:Response) :Promise<void> =>{

    const contractId = req.params.contractId
    const vendorId= req.params.vendorId

    const result = await this._contractService.removeFromContract(vendorId,contractId)

    res
      .status(StatusCodeEnum.OK)
      .json({success:true , message:MessageEnum.CONTRACT_VENDOR_REMOVED_SUCCESS})

  }


}

export default ContractController;
