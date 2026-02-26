import mongoose, { model, Schema } from "mongoose";
import { IVendor } from "../types/vendorType";
import { VerificationStatusEnum } from "../enums/statusEnum";

const vendorSchema = new Schema<IVendor>(
  {
    shopName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    proofImage: {
      type: String,
    },
    password: {
      type: String,
    },
    shopType: {
      type: mongoose.Types.ObjectId,
      ref: "ServiceTypes",
    },
    openAt: {
      type: String,
    },
    closeAt: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    workingDays: {
      type: [String],
      default: [],
    },
    ProfileImage: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    hasShop: {
      type: Boolean,
      default: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        validate: {
          validator: (v: number[]) => !v || v.length === 2,
          message: "Coordinates must be [lng, lat]",
        },
      },
    },
    planExpreData: {
      type: Date,
    },
    isVerified: {
      type: String,
      enum: Object.values(VerificationStatusEnum),
      default: VerificationStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

vendorSchema.index(
  { location: "2dsphere" },
  {
    partialFilterExpression: {
      hasShop: true,
      "location.coordinates": { $exists: true },
    },
  }
);

export default model<IVendor>("Vendor", vendorSchema);
