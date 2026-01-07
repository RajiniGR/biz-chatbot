import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./Header";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (   
    <div className="flex flex-col flex-1">
        <ChatHeader />
        <div className="flex h-screen bg-gray-100">
            {/* <Sidebar /> */}
            <main className="flex-1">{children}</main>
        </div>
    </div>
  );
}
