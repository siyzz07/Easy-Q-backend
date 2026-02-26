
import { FilterQuery } from "mongoose";
import { IReviewRepository, IReviewPopulated } from "../interface/reivew-interface/review-repository-interface";
import Review from "../models/ReviewModel";
import { IReview } from "../types/vendorType";
import BaseRepository from "./baseRepository";


export class ReviewRepository extends BaseRepository<IReview> implements IReviewRepository{

        private _ReviewModel = Review

        constructor(){
            super(Review)
        }

    //------------------------------ add new review
        async addReview(data: Partial<IReview>): Promise<boolean | void> {
            const result = await  this.create(data as IReview)
            return result ? true : false
        }

    //------------------------------ get the vendor reviews
    async getReviews(vendorId: string): Promise<IReviewPopulated[]> {
        const result = await this._ReviewModel.find({ vendorId }).populate('customerId');
        return result as unknown as IReviewPopulated[];
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

   async findOneByCondiition(conditions: FilterQuery<IReview>): Promise<IReview | null> {
        return  await this._ReviewModel.findOne(conditions)
    }

}