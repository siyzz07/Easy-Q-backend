import { ReviewResponseDTO } from "../../dto/review-dto/review-dto";

export const ReviewMapper = {
  toDTO(review: any): ReviewResponseDTO {
    return {
      _id: review._id.toString(),
      customerId: {
        _id: review.customerId._id.toString(),
        name: review.customerId.name,
      },
      vendorId: review.vendorId.toString(),
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    };
  },

  toDTOList(reviews: any[]): ReviewResponseDTO[] {
    return reviews.map((review) => this.toDTO(review));
  },
};
