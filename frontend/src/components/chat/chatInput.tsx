import { useState } from "react";
import { resetChat } from "../../services/chat.service";

type Props = {
  onSend: (message: string) => void;
};

export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="border-t bg-gray-100 p-4 w-5/6">
      <div className="flex gap-2">
        <input className="flex-1 border rounded-lg px-3 py-2 focus:outline-none" id="chatwithbot" placeholder="Ask something..." value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
        />
        <button onClick={submit} className="bg-blue-600 text-white px-4 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}
