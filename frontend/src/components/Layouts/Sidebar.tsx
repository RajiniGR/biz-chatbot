export default function Sidebar() {
  return (
    <aside className="w-64 p-6 bg-white border-r flex flex-col">
      {/* <div className="p-4 font-semibold text-lg border-b">
        Smart Biz Chatbot
      </div> */}

      <div className="flex-1 p-3 space-y-2">
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          + New Chat
        </button>

        <div className="text-sm text-gray-500 mt-4 py-2">Recent</div>

        <div className="space-y-1">
          <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">
            Conversation 1
          </div>
          <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">
            Conversation 2
          </div>
        </div>
      </div>
    </aside>
  );
}
