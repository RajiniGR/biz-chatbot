import { useEffect, useState } from "react";
import ChatHeader from "../components/chatHeader";
import ChatInput from "../components/chatInput";
import ChatMessage from "../components/chatMessage";
import {
  askChat,
  getChatHistory,
  resetChat,
} from "../services/chat.service";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function Chat() {
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
    <div className="h-screen flex flex-col bg-gray-100">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
        <p>No conversation yet</p>
        ) : (
        messages.map((m, i) => (
          <ChatMessage key={i} role={m.role} content={m.content} />
        ))
        )}
        {loading && (
          <div className="text-sm text-gray-500">Bot typing...</div>
        )}
      </div>

      <ChatInput onSend={sendMessage} />

      {/* <button onClick={sendMessage}>Send</button> */}
      <button onClick={resetConversation}>Reset</button>
    </div>
  );
}
