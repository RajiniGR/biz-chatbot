type Props = {
  role: "user" | "bot" | "admin";
  content: string;
};

export default function MessageBubble({ content, role }: Props) {
  const isUser = role === "user" || role === "admin";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md px-4 py-2 rounded-xl text-sm ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white border text-gray-800"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
