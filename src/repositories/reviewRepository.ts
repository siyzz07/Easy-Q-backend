
import { IReviewRepositoryInterface } from "../interface/reivew-interface/review-repository-interface";
import Review from "../models/ReviewModel";
import { IReview } from "../types/vendorType";
import BaseRepository from "./baseRepository";


export class ReviewRepository extends BaseRepository<any> implements IReviewRepositoryInterface{

        private _ReviewModel = Review

        constructor(){
            super(Review)
        }

    //------------------------------ add new review
        async addReview(data: Partial<IReview>): Promise<boolean | void> {
            const result = await  this.create(data)
            return result ? true : false
        }

    //------------------------------ get the vendor reviews
    async getReviews(vendorId: string): Promise<IReview[]> {
        
        const result = await this._ReviewModel.find({vendorId:vendorId}).populate('customerId')
        return result
    }
     
    //------------------------------ delete review
    async deleteReview(reviewId: string): Promise<boolean> {
        const result = await this._ReviewModel.findByIdAndDelete(reviewId)
        return result ? true : false
    }

    //------------------------------ update review
    async updateReview(reviewId: string, data: Partial<IReview>): Promise<boolean> {
        const result = await this._ReviewModel.findByIdAndUpdate(reviewId, data)
        return result ? true : false
    }

}