import { IReviewRepositoryInterface } from "../../interface/reivew-interface/review-repository-interface";
import { IReviewServiceInterface } from "../../interface/reivew-interface/review-service-interface";
import { IReview } from "../../types/vendorType";


export class ReviewService implements IReviewServiceInterface{

    private _ReviewRepository:IReviewRepositoryInterface

    constructor(reviewRepository:IReviewRepositoryInterface) {
        this._ReviewRepository=reviewRepository
    }

    async addReview(data: IReview): Promise<boolean | void> {
       return await this._ReviewRepository.addReview(data)
    }

    async getReviews(vendorId: string): Promise<IReview[]> {
        return await this._ReviewRepository.getReviews(vendorId)
    }

    async deleteReview(reviewId: string): Promise<boolean> {
        return await this._ReviewRepository.deleteReview(reviewId)
    }

    async updateReview(reviewId: string, data: Partial<IReview>): Promise<boolean> {
        return await this._ReviewRepository.updateReview(reviewId, data)
    }

}