import { NextFunction, Request, Response } from "express";
import { IReviewService } from "../../interface/reivew-interface/review-service-interface";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { MessageEnum } from "../../enums/messagesEnum";

export class ReviewController { 
  private _ReviewService: IReviewService;

  constructor(reviewService: IReviewService) {
    this._ReviewService = reviewService;
  }

  addNewReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this._ReviewService.addReview(req.body);
      res.status(StatusCodeEnum.CREATED).json({
        success: true,
        message: MessageEnum.REVIEW_ADD_SUCCESS,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { vendorId } = req.params;
      const { userId } = req.body; 
      const result = await this._ReviewService.getReviews(vendorId, userId);
      res.status(StatusCodeEnum.OK).json({
        success: true,
        message: MessageEnum.REVIEW_FETCH_SUCCESS,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  editReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { reviewId } = req.params;
      const result = await this._ReviewService.updateReview(reviewId, req.body);
      res.status(StatusCodeEnum.OK).json({
        success: true,
        message: MessageEnum.REVIEW_UPDATE_SUCCESS,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { reviewId } = req.params;
      const result = await this._ReviewService.deleteReview(reviewId);
      res.status(StatusCodeEnum.OK).json({
        success: true,
        message: MessageEnum.REVIEW_DELETE_SUCCESS,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}