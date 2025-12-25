import mongoose, { model, Schema } from "mongoose";
import { IFavorite } from "../types/customerType";





const favoriteSchema = new Schema<IFavorite>({
    customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
    vendors: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
    }
  ]

})

export default model<IFavorite>('Favorite',favoriteSchema)

