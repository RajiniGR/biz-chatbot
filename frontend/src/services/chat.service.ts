import api from "./api";

export const askChat = async (message: string) => 
  await api.post("/chat/ask", { message });

export const getChatHistory = () =>
  api.get("/chat/history");

export const resetChat = () =>
  api.delete("/chat/reset");

// export async function sendMessage(message: string) {
//   const res = await api.post("/chat/ask", { message });
//   return res.data; // { reply, conversationId }
// }

// export async function getConversation() {
//   const res = await api.get("/chat/history");
//   return res.data;
// }