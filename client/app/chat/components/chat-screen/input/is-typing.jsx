import getFilePath from "@/app/helper/get-file-path"
import findFirstLetter from "@/app/helper/find-first-letter"
import { useContext, useEffect } from "react"
import ChatScreenContext from "../context"

export default function ChatInputIsTyping({ typingUsers, socket, userInput }) {

    const {chat} = useContext(ChatScreenContext)

    useEffect(() => {
        if (!socket || !userInput) return

        if (window.typingTimeout) {
            clearTimeout(window.typingTimeout)
        }

        if (window.stopTypingTimeout) {
            clearTimeout(window.stopTypingTimeout)
        }

        // Only emit typing if it's been more than 1 second since last emit
        if (!window.lastTypingEmit || Date.now() - window.lastTypingEmit > 1000) {
            socket.emit('typing', { groupId: chat.id })
            window.lastTypingEmit = Date.now()
        }
        
        // Set new timeout to emit stop-typing after 1 seconds
        window.stopTypingTimeout = setTimeout(() => {
            socket.emit('stop-typing', { groupId: chat.id })
        }, 1000)
    }, [socket, userInput])

    return (
        <div className="flex items-center mb-2 relative h-[32px]">
            <div className="relative h-[32px] w-full">
                {
                    typingUsers.map((user, index) => {
                        const typingUsersLength = typingUsers.length
                        return (
                            <span key={index}>
                                <div style={{ backgroundImage: `url(${getFilePath(user.thumbnailURI)})`, left: `${index * 10}px` }} className={`absolute bg-${findFirstLetter(user.username)} border-2 border-${findFirstLetter(user.username)} min-w-[32px] min-h-[32px] rounded-full bg-cover bg-center`}></div>
                                {
                                    index === typingUsersLength - 1 &&
                                    <div style={{ left: `${32 + index * 10 + 8}px` }} className="absolute text-sm text-gray-500 bottom-0 bg-backgroundLight">
                                        {
                                            typingUsersLength === 1 && typingUsers[0].username + ' is typing...'
                                        }
                                        {
                                            typingUsersLength === 2 && typingUsers[0].username + ' and ' + typingUsers[1].username + ' are typing...'
                                        }
                                        {
                                            typingUsersLength > 2 && typingUsers[0].username + ', ' + typingUsers[1].username + ' and ' + (typingUsersLength - 2) + (typingUsersLength - 2 === 1 ? ' other ' : ' others ') + 'are typing...'
                                        }
                                    </div>
                                }
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}