import { useEffect, useState } from "react";
import ChatLayout from "../components/Layouts/chatLayout";
import ChatWindow from "../components/chat/ChatWindow";

export default function Chat() {
  
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <ChatLayout>        
      <ChatWindow />
      </ChatLayout>
      {/* <div className="p-4">
      <button onClick={resetConversation}>Reset</button>
      </div> */}
      {/* <ChatInput onSend={sendMessage} />
      <button onClick={resetConversation}>Reset</button> */}
    </div>
  );
}
