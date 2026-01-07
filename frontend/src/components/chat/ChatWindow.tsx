import { useEffect, useState } from "react";
import MessageBubble from "./chatMessage";
import MessageInput from "./chatInput";

import {
  askChat,
  getChatHistory,
  resetChat,
} from "../../services/chat.service";

type Message = {
  role: "user" | "bot" | "admin";
  content: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const conversationHistory = (async () => {
      try {
        const history = await getChatHistory();
        setMessages(history.data);
      } catch (error) {
        console.error("Failed to fetch conversation:", error);
      }finally{
        setLoading(false)
      }
    });
    conversationHistory();
  }, []);

  const sendMessage = async (text: string) => {
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setLoading(true);

     try {
      const res = await askChat(text);
      console.log("aireply");
        setMessages(prev => [
          ...prev,
          { role: "bot", content: res.data.reply },
        ]);      
    }catch(err: any) {
        // console.log("Error occurred", err.response.data.message);
        setMessages(prev => [...prev, { role: "bot", content: err.response.data.message }]);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const resetConversation = async () => {
    await resetChat();
    setMessages([]);
  };

  
  return (
    <div className="flex flex-col h-full">
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            <MessageBubble content="Hello! How can I help you?" role="bot" />
            <MessageBubble content="Explain my sales data" role="user" />
        <div className="border-t"> </div>
        
            {messages.length === 0 ? (
              <div className="flex justify-start">
                <p className="max-w-md px-4 py-2 rounded-xl text-sm bg-white border text-gray-800">No conversation yet</p>
              </div>
                ) : (
                messages.map((m, i) => (
                <MessageBubble key={i} role={m.role} content={m.content} />
                ))
            )}
            {loading && (
                <div className="text-sm text-gray-500">Bot typing...</div>
            )}
        </div>
        <div className="flex">
            <MessageInput onSend={sendMessage} />
            <div className="flex w-1/6 border-t bg-gray-100 p-4 gap-2">
            <button onClick={resetConversation} className="bg-blue-600 text-white px-4 rounded-lg basis-1/3">Reset</button>
            </div>
        </div>
    </div>
  );
}
