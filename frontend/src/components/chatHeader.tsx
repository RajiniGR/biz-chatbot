import { useAuth } from "../context/AuthContext";

export default function ChatHeader() {
  const { user, logout } = useAuth();

  return (
    <div className=" items-center justify-center">
        <div className="flex items-center justify-between p-4 border-b bg-white">
            <h1 className="font-semibold text-lg">Smart Biz Chat</h1>
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{user?.email}</span>
                <button
                onClick={logout}
                className="text-sm text-red-600 hover:underline"
                >
                Logout
                </button>
            </div>
        </div>
    </div>
  );
}