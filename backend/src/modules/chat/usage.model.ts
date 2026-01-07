import { Schema, model, Types } from "mongoose";

const UsageSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    count: { type: Number, default: 0 }
  },
  { timestamps: true }
);

UsageSchema.index({ userId: 1, date: 1 }, { unique: true });

export const UsageModel = model("Usage", UsageSchema);
