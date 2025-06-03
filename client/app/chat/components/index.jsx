'use client'
import { useState } from "react"
import ChatInfo from "./chat-info"
import ChatScreen from "./chat-screen"
import ChatSidebar from "./chat-sidebar"

export default function ChatPage({ chat }) {
    const [sidebarOpen, setSidebarOpen] = useState(chat ? false : true)

    return (
        <main className="min-h-screen flex">
            <ChatSidebar activeGroupId={chat?.id} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {
                chat ? (
                    <div className="min-h-screen bg-backgroundLight w-full relative lg:ms-[20rem] lg:w-[calc(100%-20rem)]">
                        <ChatInfo sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} chat={chat} />
                        <div className="min-h-screen max-h-screen bg-backgroundLight w-full relative">
                            <ChatScreen chat={chat} />
                        </div>
                    </div>
                ) : (
                    <div className="min-h-screen bg-backgroundLight w-full relative lg:ms-[20rem] lg:w-[calc(100%-20rem)]">
                        <div className="min-h-screen max-h-screen bg-backgroundLight w-full relative">
                        </div>
                    </div>
                )
            }
        </main>
    )
}