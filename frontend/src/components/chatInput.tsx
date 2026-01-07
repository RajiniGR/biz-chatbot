import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-2 p-4 border-t bg-white">
      <input
        className="flex-1 border rounded px-3 py-2 text-sm"
        placeholder="Ask something..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && submit()}
      />
      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}