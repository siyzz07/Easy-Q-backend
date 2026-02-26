import { ReviewResponseDTO } from "../../dto/review-dto/review-dto";

export interface IPopulatedReview {
  _id: { toString(): string } | string;
  customerId: {
    _id: { toString(): string } | string;
    name?: string;
  };
  vendorId: { toString(): string } | string;
  rating: number | string;
  comment?: string;
  createdAt?: Date;
}

export const ReviewMapper = {
  toDTO(review: IPopulatedReview): ReviewResponseDTO {
    return {
      _id: review._id.toString(),
      customerId: {
        _id: review.customerId._id.toString(),
        name: review.customerId.name || "",
      },
      vendorId: review.vendorId.toString(),
      rating: review.rating?.toString() || "0",
      comment: review.comment || "",
      createdAt: review.createdAt || new Date(),
    };
  },

  toDTOList(reviews: IPopulatedReview[]): ReviewResponseDTO[] {
    return reviews.map((review) => this.toDTO(review));
  },
};
