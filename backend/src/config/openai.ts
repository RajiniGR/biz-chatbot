import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askOpenAI(prompt: string) {
  try{
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });
    return completion.choices[0].message.content || "No response";

  } catch(error: any){
    if(error.status === 429) {
      // console.log("AI usage limit reached", error);
      // throw new Error("AI usage limit reached");
      return error;
    }
    return error;
    // throw new Error("Failed to get AI response");
  }
}