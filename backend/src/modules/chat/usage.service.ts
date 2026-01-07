import { askOpenAI } from "../../config/openai";
import { checkChatLimit, incrementChatUsage } from "../../config/limits";

const today = () => new Date().toISOString().split("T")[0];

export async function processChat(userId: string, prompt: string) {
  await checkChatLimit(userId)
  const answer = await askOpenAI(prompt);
  await incrementChatUsage(userId); 

  return answer;
}
