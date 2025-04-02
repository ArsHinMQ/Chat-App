"use client"

import { useLanguage } from "@/app/provider/language-provider"
import ChatSidebarHeader from "./header"
import ChatSidebarSingleChat from "./single-chat"
import { useRouter } from "next/navigation"

export default function ChatSidebar({ sidebarOpen, setSidebarOpen }) {

    const {direction} = useLanguage()

    const singleGroupChatClick = () => {
        setSidebarOpen(false)
    }

    return (
        <div className={`bg-backgroundDark fixed ${direction === 'ltr' ? 'left-0' : 'right-0'} lg:w-[20rem] w-full ${!sidebarOpen ? '-translate-x-full' : ''} transition-transform  lg:translate-x-0  z-20 h-full h-full`}>
            <ChatSidebarHeader />
            <div className="p-3 h-[calc(100%-5rem)] hidden-scrollbar overflow-auto">
                <ChatSidebarSingleChat singleGroupChatClick={singleGroupChatClick} groupId={1} groupName="Fun Stuff" lastMessage="Yooo what's up guys??? missing you so much" />
                <ChatSidebarSingleChat singleGroupChatClick={singleGroupChatClick} groupId={2} groupName="Awesome People" lastMessage="One Two Three Four, Here we go" />
                <ChatSidebarSingleChat singleGroupChatClick={singleGroupChatClick} groupId={3} groupName="Tech Talk" lastMessage="Did you see the latest React update?" />
                <ChatSidebarSingleChat singleGroupChatClick={singleGroupChatClick} groupId={4} groupName="Movie Club" lastMessage="Let's watch something this weekend!" />
                <ChatSidebarSingleChat singleGroupChatClick={singleGroupChatClick} groupId={5} groupName="Coffee Lovers" lastMessage="Anyone up for a coffee meet?" />
                <ChatSidebarSingleChat singleGroupChatClick={singleGroupChatClick} groupId={6} groupName="Study Group" lastMessage="Don't forget about tomorrow's session" />
                <ChatSidebarSingleChat singleGroupChatClick={singleGroupChatClick} groupId={7} groupName="Gaming Squad" lastMessage="Ready for tonight's tournament?" />
            </div>
        </div>
    )
}