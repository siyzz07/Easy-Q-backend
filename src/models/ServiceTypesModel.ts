import { model, Schema } from "mongoose";
import { IServiceType } from "../types/adminTypes";

const ServiceTypeSchema = new Schema<IServiceType>({
  serviceName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
});


export default model<IServiceType>('ServiceTypes',ServiceTypeSchema)
