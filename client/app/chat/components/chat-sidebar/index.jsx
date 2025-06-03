"use client"

import { useLanguage } from "@/app/provider/language-provider"
import ChatSidebarHeader from "./header"
import ChatSidebarSingleChat from "./single-chat"
import { useEffect, useState, useRef, useCallback } from "react"
import request from "@/app/request"

export default function ChatSidebar({ activeGroupId, sidebarOpen, setSidebarOpen }) {
    const [groups, setGroups] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const { direction } = useLanguage()
    const observer = useRef()
    const lastGroupRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    const singleGroupChatClick = () => {
        setSidebarOpen(false)
    }

    const fetchGroups = async (pageNum) => {
        try {
            setLoading(true)
            const res = await request({
                route: `/group/my?page=${pageNum}`,
                method: 'GET',
                withAuth: true,
            })
            
            const newGroups = res.data.groups
            setGroups(prevGroups => pageNum === 1 ? newGroups : [...prevGroups, ...newGroups])
            setHasMore(newGroups.length === 10) // Assuming 10 is our page size
        } catch (error) {
            console.error('Error fetching groups:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGroups(page)
    }, [page])

    return (
        <div className={`bg-backgroundDark fixed ${direction === 'ltr' ? 'left-0' : 'right-0'} lg:w-[20rem] w-full ${!sidebarOpen ? '-translate-x-full' : ''} transition-transform  lg:translate-x-0  z-20 h-full h-full`}>
            <ChatSidebarHeader />
            <div className="p-3 h-[calc(100%-5rem)] hidden-scrollbar overflow-auto">
                {groups.map((group, index) => {
                    if (groups.length === index + 1) {
                        return (
                            <div ref={lastGroupRef} key={group.id}>
                                <ChatSidebarSingleChat 
                                    activeGroupId={activeGroupId}
                                    singleGroupChatClick={singleGroupChatClick} 
                                    groupId={group.id} 
                                    groupName={group.name} 
                                    lastMessage={group.lastMessage} 
                                    thumbnailURI={group.thumbnailURI}
                                />
                            </div>
                        )
                    } else {
                        return (
                            <ChatSidebarSingleChat 
                                activeGroupId={activeGroupId}
                                key={group.id}
                                singleGroupChatClick={singleGroupChatClick} 
                                groupId={group.id} 
                                groupName={group.name} 
                                lastMessage={group.lastMessage} 
                                thumbnailURI={group.thumbnailURI}
                            />
                        )
                    }
                })}
                {groups.length === 0 && (
                    <div className="text-center py-2 text-gray-500">
                        No groups found
                    </div>
                )}
                {loading && (
                    <div className="text-center py-2 text-gray-500">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    )
}