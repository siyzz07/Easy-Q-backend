import { IReview } from "../../types/vendorType";


export interface IReviewRepository{

    addReview(data: Partial<IReview>): Promise<boolean | void>
    getReviews(vendorId: string): Promise<IReview[]>
    deleteReview(reviewId: string): Promise<boolean>
    updateReview(reviewId: string, data: Partial<IReview>): Promise<boolean>
    findOneByCondiition(conditions: object): Promise<IReview | null>
}