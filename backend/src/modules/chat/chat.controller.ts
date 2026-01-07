import { Response } from "express";
import {
  createConversation,
  getConversationHistory,
  resetConversationHistory,
} from "./chat.service";
import { AuthRequest } from "../../middleware/authMiddleware";

export const askChat = async (req: AuthRequest, res: Response) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ message: "Message is required" });
    }
    const reply = await createConversation(req.user!.id, message);
    if(reply.status === 429) {
      res.status(429).json({ message: "AI usage limit reached" });
    }else{
      res.status(200).json({ reply });
    }

  } catch(err: any) {
    res.status(429).json({ message: err.message || "AI usage limit reached" });
  }
};

export const getChatHistory = async (req: AuthRequest, res: Response) => {
  const history = await getConversationHistory(req.user!.id);
  res.status(200).json(history);
};

export const resetChat = async (req: AuthRequest, res: Response) => {
  await resetConversationHistory(req.user!.id);
  res.status(200).json({ message: "Chat history reset successfully" });
};
