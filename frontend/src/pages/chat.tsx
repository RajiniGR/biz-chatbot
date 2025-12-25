import { useEffect, useState } from "react";
import api from "../services/api";

type Msg = {
  from: "user" | "bot";
  text: string;
};

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    api.get("/chat/history").then((res) => {
      const allMsgs = res.data.flatMap((c: any) => c.messages);
      setMsgs(allMsgs);
    });
  }, []);

  const send = async () => {
    if (!text) return;

    setMsgs((prev) => [...prev, { from: "user", text }]);

    const res = await api.post("/chat/ask", { prompt: text });

    setMsgs((prev) => [...prev, { from: "bot", text: res.data.reply }]);
    setText("");
  };

  return (
    <div>
      <h2>Chat</h2>
      {msgs.map((m, i) => (
        <p key={i}>
          <b>{m.from}:</b> {m.text}
        </p>
      ))}
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
