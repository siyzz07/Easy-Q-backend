import { IReviewRepositoryInterface } from "../../interface/reivew-interface/review-repository-interface";
import { IReviewServiceInterface } from "../../interface/reivew-interface/review-service-interface";


export class ReviewService implements IReviewServiceInterface{

    private _ReviewRepository:IReviewRepositoryInterface

    constructor(reviewRepository:IReviewRepositoryInterface) {
        this._ReviewRepository=reviewRepository
    }



}