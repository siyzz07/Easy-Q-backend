import { IReviewRepositoryInterface } from "../interface/reivew-interface/review-repository-interface";
import Review from "../models/ReviewModel";
import { IReview } from "../types/vendorType";
import BaseRepository from "./baseRepository";


export class ReviewRepository extends BaseRepository<any> implements IReviewRepositoryInterface{

        private _ReivewModel = Review

        constructor(){
            super(Review)
        }


        async addReivew(data: IReview): Promise<boolean | void> {
            let result = await  this.create(data)
        }


}