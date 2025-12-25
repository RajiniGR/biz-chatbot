import { openai } from "../../config/openai";
import { Conversation } from "./conversation.model";
import { FAQ } from "./faq.model";

/**
 * Ask chatbot:
 * 1. Try FAQ match
 * 2. Fallback to OpenAI
 * 3. Persist conversation
 */
export async function askChatBot(
  userId: string,
  prompt: string
): Promise<string> {
  // FAQ first (cheap + deterministic)
  const faq = await FAQ.findOne({
    question: { $regex: prompt, $options: "i" },
  });

  let reply: string;

  if (faq) {
    reply = faq.answer;
  } else {
    // OpenAI fallback
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    reply = completion.choices[0].message.content ?? "No response";
  }

  // Save conversation
  await Conversation.create({
    userId,
    messages: [
      { from: "user", text: prompt },
      { from: "bot", text: reply },
    ],
  });

  return reply;
}

/**
 * Fetch chat history for a user
 */
export async function getConversationHistory(userId: string) {
  return Conversation.find({ userId }).sort({ createdAt: -1 });
}
