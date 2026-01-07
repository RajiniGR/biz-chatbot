import { Conversation } from "./chat.model";
import { askOpenAI } from "../../config/openai";
import { checkChatLimit, incrementChatUsage } from "../../config/limits";

export const createConversation = async (
  userId: string,
  userMessage: string
) => {

  await checkChatLimit(userId);
  const aiReply = await askOpenAI(userMessage);
  if(aiReply.status === 429){
    return aiReply;
  }else{
    const conversation = await Conversation.create({
      userId,
      messages: [
        { role: "user", content: userMessage },
        { role: "bot", content: aiReply },
      ],
    });
    await incrementChatUsage(userId);
  }
  return aiReply;
};

export const getConversationHistory = async (userId: string) => {
  const conversations = await Conversation.find({ userId })
    .sort({ createdAt: 1 })
    .lean();

  return conversations.flatMap(c => c.messages);
};

export const resetConversationHistory = async (userId: string) => {
  await Conversation.deleteMany({ userId });
};
