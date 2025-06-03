import { useContext, useEffect, useRef, useCallback } from "react"
import ChatSingleMessage from "./message"
import ChatScreenContext from "../context"
import { CircularProgress } from '@mui/material'

export default function ChatMessages() {
    const { messages, loadMoreMessages, loading, hasMore } = useContext(ChatScreenContext)
    const messagesContainer = useRef(null)
    const observer = useRef()

    const lastMessageRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMoreMessages()
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore, loadMoreMessages])

    useEffect(() => {
        if (messagesContainer.current) {
            messagesContainer.current.scrollBy(0, messagesContainer.current.scrollHeight)
        }
    }, [messages])

    return (
        <div className="flex justify-center items-center h-full">
            <div className="max-w-[1020px] w-full">
                <div ref={messagesContainer} id='msgContainer' className="mt-6 pt-[4.5rem] max-h-screen overflow-y-auto bg-backgroundLight pb-[5.5rem] hidden-scrollbar">
                    {loading && (
                        <div className="flex justify-center py-4">
                            <CircularProgress size={24} />
                        </div>
                    )}
                    {messages.map((message, index) => {
                        let isLastFromThisSender = true
                        let isFirstFromThisSender = true

                        if ((index !== (messages.length - 1) && messages[index + 1].sender && message.sender) && messages[index + 1].sender.id === message.sender.id) {
                            isLastFromThisSender = false
                        }

                        if (index !== 0 && messages[index - 1].sender && message.sender && messages[index - 1].sender.id === message.sender.id) {
                            isFirstFromThisSender = false
                        }

                        if (index === 0) {
                            return (
                                <div ref={lastMessageRef} key={index}>
                                    <ChatSingleMessage message={message} isLastFromThisSender={isLastFromThisSender} isFirstFromThisSender={isFirstFromThisSender} />
                                </div>
                            )
                        }

                        return (
                            <ChatSingleMessage key={index} message={message} isLastFromThisSender={isLastFromThisSender} isFirstFromThisSender={isFirstFromThisSender} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}