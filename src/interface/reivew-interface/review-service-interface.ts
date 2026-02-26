import { IReview } from "../../types/vendorType";
import { ReviewResponseDTO } from "../../dto/review-dto/review-dto";

export interface IReviewService{
    addReview(data: {userId: string; vendorId: string; rating: string; comment: string}): Promise<boolean | void>;
    getReviews(vendorId: string, userId?: string): Promise<ReviewResponseDTO[]>;
    deleteReview(reviewId: string): Promise<boolean>;
    updateReview(reviewId: string, data: Partial<IReview>): Promise<boolean>;
}