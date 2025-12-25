import { Schema, model, Types } from "mongoose";

interface Message {
  from: "user" | "bot";
  text: string;
}

const messageSchema = new Schema<Message>(
  {
    from: { type: String, enum: ["user", "bot"], required: true },
    text: { type: String, required: true },
  },
  { _id: false }
);

const conversationSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    messages: [messageSchema],
  },
  { timestamps: true }
);

export const Conversation = model("Conversation", conversationSchema);
