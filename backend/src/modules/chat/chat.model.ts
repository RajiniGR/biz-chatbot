import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "bot"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const ConversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: {
      type: [MessageSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", ConversationSchema);
