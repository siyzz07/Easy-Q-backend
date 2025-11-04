import { IReview } from "../../types/vendorType";


export interface IReviewRepositoryInterface{

    addReivew (data:IReview):Promise<boolean|void>



}