import { IReviewRepositoryInterface } from "../../interface/reivew-interface/review-repository-interface";
import { IReviewServiceInterface } from "../../interface/reivew-interface/review-service-interface";
import { IReview } from "../../types/vendorType";
import { StatusCodeEnum } from "../../enums/httpStatusCodeEnum";
import { ErrorResponse } from "../../utils/errorResponse";
import { ReviewResponseDTO } from "../../dto/review-dto/review-dto";
import { ReviewMapper } from "../../mappers/review-mapper/review-mapper";
import { IVendorRepo } from "../../interface/vendor-interface/vendor-respository-interface";

interface IReviewPayload {
  userId: string;
  vendorId: string;
  rating: string;
  comment: string;
}

export class ReviewService implements IReviewServiceInterface {
  private _ReviewRepository: IReviewRepositoryInterface;
  private _VendorRepository: IVendorRepo;

  constructor(
    reviewRepository: IReviewRepositoryInterface,
    vendorRepository: IVendorRepo
  ) {
    this._ReviewRepository = reviewRepository;
    this._VendorRepository = vendorRepository;
  }

  async addReview(data: IReviewPayload): Promise<boolean | void> {
    const existingReview = await this._ReviewRepository.findOneByCondiition({
      customerId: data.userId,
      vendorId: data.vendorId,
    });

    if (existingReview) {
      throw new ErrorResponse(
        "You have already reviewed this vendor.",
        StatusCodeEnum.CONFLICT
      );
    }

    const reviewData: Partial<IReview> = {
      customerId: data.userId,
      vendorId: data.vendorId,
      rating: data.rating,
      comment: data.comment,
    };

    let result = await this._ReviewRepository.addReview(reviewData);

    if (result) {
      const totalReview = await this._ReviewRepository.getReviews(
        data.vendorId
      );
      const [count, ratingSum] = totalReview.reduce(
        ([count, ratingSum], value) => {
          return [count + 1, ratingSum + Number(value.rating)];
        },
        [0, 0]
      );

      const avgRating = count == 0 ? 0 : (ratingSum / count).toFixed(1);

      await this._VendorRepository.findByIdAndUpdate(data.vendorId, {
        rating: avgRating,
      });
      return true;
    } else {
      return false;
    }
  }

  async getReviews(
    vendorId: string,
    userId?: string
  ): Promise<ReviewResponseDTO[]> {
    const reviews = await this._ReviewRepository.getReviews(vendorId);

    if (userId && reviews.length > 0) {
      // Find the review by the current user
      const userReviewIndex = reviews.findIndex(
        (review: any) =>
          review.customerId?._id?.toString() === userId ||
          review.customerId?.toString() === userId
      );

      if (userReviewIndex > -1) {
        const [userReview] = reviews.splice(userReviewIndex, 1);
        reviews.unshift(userReview);
      }
    }
    return ReviewMapper.toDTOList(reviews);
  }

  async deleteReview(reviewId: string): Promise<boolean> {
    const ReviewData = await this._ReviewRepository.findOneByCondiition({
      _id: reviewId,
    });
    let shopId;
    if (ReviewData) {
      shopId = ReviewData.vendorId;
    }
    let review = await this._ReviewRepository.deleteReview(reviewId);

    if (review) {
      const totalReview = await this._ReviewRepository.getReviews(
        shopId as string
      );
      const [count, ratingSum] = totalReview.reduce(
        ([count, ratingSum], value) => {
          return [count + 1, ratingSum + Number(value.rating)];
        },
        [0, 0]
      );

      const avgRating = count == 0 ? 0 : (ratingSum / count).toFixed(1);

      await this._VendorRepository.findByIdAndUpdate(shopId as string, {
        rating: avgRating,
      });
      return true;
    } else {
      return false;
    }
  }

  async updateReview(
    reviewId: string,
    data: Partial<IReview>
  ): Promise<boolean> {
    const ReviewData = await this._ReviewRepository.findOneByCondiition({
      _id: reviewId,
    });
    let shopId;
    if (ReviewData) {
      shopId = ReviewData.vendorId;
    }
    let review = await this._ReviewRepository.updateReview(reviewId, data);

    if (review) {
      const totalReview = await this._ReviewRepository.getReviews(
        shopId as string
      );
      const [count, ratingSum] = totalReview.reduce(
        ([count, ratingSum], value) => {
          return [count + 1, ratingSum + Number(value.rating)];
        },
        [0, 0]
      );

      const avgRating = count == 0 ? 0 : (ratingSum / count).toFixed(1);

      await this._VendorRepository.findByIdAndUpdate(shopId as string, {
        rating: avgRating,
      });
      return true;
    } else {
      return false;
    }
  }
}
