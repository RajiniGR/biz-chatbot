import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import { askChatBot, getConversationHistory } from "./chat.service";

export async function askBot(req: AuthRequest, res: Response) {
  try {
    const { prompt } = req.body;
    const userId = req.user!.id;

    const reply = await askChatBot(userId, prompt);
    res.json({ reply });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getHistory(req: AuthRequest, res: Response) {
  const history = await getConversationHistory(req.user!.id);
  res.json(history);
}
