import { IReview } from "../../types/vendorType";


export interface IReviewRepositoryInterface{

    addReview(data: IReview): Promise<boolean | void>
    getReviews(vendorId: string): Promise<IReview[]>
    deleteReview(reviewId: string): Promise<boolean>
    updateReview(reviewId: string, data: Partial<IReview>): Promise<boolean>



}