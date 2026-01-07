import { UsageModel } from "../modules/chat/usage.model";

const DAILY_LIMIT = 10; // change anytime

function today() {
  return new Date().toISOString().split("T")[0];
}

export async function checkChatLimit(userId: string) {
  const date = today();

  const usage = await UsageModel.findOne({ userId, date });

  if (usage && usage.count >= DAILY_LIMIT) {
    throw new Error("Daily AI usage limit exceeded");
  }
}

export async function incrementChatUsage(userId: string) {
  const date = today();

  await UsageModel.findOneAndUpdate(
    { userId, date },
    { $inc: { count: 1 } },
    { upsert: true }
  );
}
