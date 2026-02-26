import { IReview } from "../../types/vendorType";

export interface IReviewPopulated {
  _id: string | { toString(): string };
  customerId: {
    _id: string | { toString(): string };
    name?: string;
  };
  vendorId: string | { toString(): string };
  rating: string | number;
  comment?: string;
  createdAt?: Date;
}

export interface IReviewRepository{

    addReview(data: Partial<IReview>): Promise<boolean | void>
    getReviews(vendorId: string): Promise<IReviewPopulated[]>
    deleteReview(reviewId: string): Promise<boolean>
    updateReview(reviewId: string, data: Partial<IReview>): Promise<boolean>
    findOneByCondiition(conditions: object): Promise<IReview | null>
}