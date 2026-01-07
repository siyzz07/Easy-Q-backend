import { IReviewRepositoryInterface } from "../../interface/reivew-interface/review-repository-interface";
import { IReviewServiceInterface } from "../../interface/reivew-interface/review-service-interface";
import { IReview } from "../../types/vendorType";


import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { ErrorResponse } from "../../utils/errorResponse";

interface IReviewPayload {
    userId: string;
    vendorId: string;
    rating: string;
    comment: string;
}

export class ReviewService implements IReviewServiceInterface{

    private _ReviewRepository:IReviewRepositoryInterface

    constructor(reviewRepository:IReviewRepositoryInterface) {
        this._ReviewRepository=reviewRepository
    }

    async addReview(data: IReviewPayload): Promise<boolean | void> {
       const existingReview = await this._ReviewRepository.findOneByCondiition({
           customerId: data.userId,
           vendorId: data.vendorId
       });

       if (existingReview) {
           throw new ErrorResponse("You have already reviewed this vendor.", StatusCodeEnum.CONFLICT);
       }
       
       const reviewData: Partial<IReview> = {
           customerId: data.userId,
           vendorId: data.vendorId,
           rating: data.rating,
           comment: data.comment
       };

       return await this._ReviewRepository.addReview(reviewData)
    }

    async getReviews(vendorId: string, userId?: string): Promise<IReview[]> {
        const reviews = await this._ReviewRepository.getReviews(vendorId)
        
        if (userId && reviews.length > 0) {
            // Find the review by the current user
            const userReviewIndex = reviews.findIndex((review: any) => 
                review.customerId?._id?.toString() === userId || review.customerId?.toString() === userId
            );
            
            if (userReviewIndex > -1) {
                const [userReview] = reviews.splice(userReviewIndex, 1);
                reviews.unshift(userReview);
            }
        }
        return reviews
    }

    async deleteReview(reviewId: string): Promise<boolean> {
        return await this._ReviewRepository.deleteReview(reviewId)
    }

    async updateReview(reviewId: string, data: Partial<IReview>): Promise<boolean> {
        return await this._ReviewRepository.updateReview(reviewId, data)
    }

}