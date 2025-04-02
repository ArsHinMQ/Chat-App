import { useContext, useEffect, useRef } from "react"
import ChatSingleMessage from "./message"
import ChatScreenContext from "../context"

export default function ChatMessages() {

    const { messages } = useContext(ChatScreenContext)
    const messagesContainer = useRef(null)

    useEffect(() => {
        if (messagesContainer.current) {
            messagesContainer.current.scrollBy(0, messagesContainer.current.scrollHeight)
        }
    }, [messages])

    return (
        <div className="flex justify-center items-center h-full">
            <div className="max-w-[1020px] w-full">
                <div ref={messagesContainer} id='msgContainer' className="mt-6 pt-[4.5rem] max-h-screen overflow-y-auto bg-backgroundLight pb-[5.5rem] hidden-scrollbar">
                    {

                        messages.map((message, index) => {
                            let isLastFromThisSender = true
                            let isFirstFromThisSender = true

                            if (index !== (messages.length - 1) && messages[index + 1].user.id === message.user.id) {
                                isLastFromThisSender = false
                            }

                            if (index !== 0 && messages[index - 1].user.id === message.user.id) {
                                isFirstFromThisSender = false
                            }

                            return (
                                <ChatSingleMessage key={index} message={message} isLastFromThisSender={isLastFromThisSender} isFirstFromThisSender={isFirstFromThisSender} />
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}