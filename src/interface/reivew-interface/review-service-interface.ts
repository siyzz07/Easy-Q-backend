import { IReview } from "../../types/vendorType";

export interface IReviewServiceInterface{
    addReview(data: {userId: string; vendorId: string; rating: string; comment: string}): Promise<boolean | void>;
    getReviews(vendorId: string, userId?: string): Promise<IReview[]>;
    deleteReview(reviewId: string): Promise<boolean>;
    updateReview(reviewId: string, data: Partial<IReview>): Promise<boolean>;
}