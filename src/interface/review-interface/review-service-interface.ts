import { CreateReviewDTO, ReviewResponseDTO } from "../../dto/review-dto/review-dto";

export interface IReviewService{
    addReview (data:CreateReviewDTO):Promise<ReviewResponseDTO[]>
    getReviews (vendorId:string) :Promise<ReviewResponseDTO[]>
    deleteReview (reviewId:string,vendorId:string):Promise<ReviewResponseDTO[]>
    editReview (reviewId:string,vendorId:string,data:Partial<CreateReviewDTO>):Promise<ReviewResponseDTO[]>
}