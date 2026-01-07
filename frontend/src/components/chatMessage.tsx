type Props = {
  role: "user" | "bot" | "admin";
  content: string;
};

export default function ChatMessage({ role, content }: Props) {
  const isUser = (role === "admin" || role === "user");

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs px-4 py-2 rounded-lg text-sm ${ isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900" }`} >
        {content}
      </div>
    </div>
  );
}