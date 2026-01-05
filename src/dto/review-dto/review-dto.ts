export interface CreateReviewDTO {
  rating: string;
  comment: string;
  vendorId: string;
  customerId: string;
}

export interface ReviewResponseDTO {
  _id: string;
  customerId: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  vendorId: string;
  rating: string;
  comment: string;
  createdAt: Date;
}
