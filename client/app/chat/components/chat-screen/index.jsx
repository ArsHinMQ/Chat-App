'use client'

import { useRef, useState, useEffect } from "react"
import ChatScreenContext from "./context"
import ChatInput from "./input"
import ChatMessages from "./messages/index"
import config from "@/app/config"
import { io } from "socket.io-client"
import request from "@/app/request"

export default function ChatScreen({ chat }) {
    const [messages, setMessages] = useState([])
    const [userInput, setUserInput] = useState('')
    const [typingUsers, setTypingUsers] = useState([])
    const [me, setMe] = useState(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)

    const socketRef = useRef(null)


    const updateMessages = (msg_bundle, attachments, tempId) => {
        const { message: text, sentAt, userId, user } = msg_bundle

        if (userId !== me.id) {
            setMessages(prevMessages => [...prevMessages, {
                id: null,
                tempId: tempId,
                text: text,
                sentAt: sentAt,
                status: 'sent',
                fromMe: false,
                sender: {
                    id: user.id,
                    username: user.username,
                    thumbnailURI: user.thumbnailURI
                },
                attachments: attachments
            }])
            return
        }

        setMessages(prevMessages =>
            prevMessages.map(msg => {
                if (!msg.id && msg.tempId === tempId) {
                    return {
                        ...msg,
                        id: null,
                        text: text,
                        sentAt: sentAt,
                        status: 'sent',
                        fromMe: true,
                        sender: {
                            id: me.id,
                            username: me.username,
                            thumbnailURI: me.thumbnailURI
                        },
                        attachments: attachments
                    }
                }
                return msg
            })
        )
    }

    useEffect(() => {
        const fetchMe = async () => {
            const response = await request({ route: '/user/me', method: 'GET' })
            if (response.status !== 200) return
            setMe(response.data)
        }

        const fetchMessages = async (pageNum = 1, append = false) => {
            setLoading(true)
            const response = await request({ route: `/message/${chat.id}?page=${pageNum}`, method: 'GET' })
            if (response.status !== 200) return
            
            const newMessages = response.data.messages
            setMessages(prevMessages => append ? [...prevMessages, ...newMessages] : newMessages)
            setHasMore(response.data.pager.page < response.data.pager.totalPages)
            setLoading(false)
        }

        fetchMe()
        fetchMessages()
    }, [])

    const loadMoreMessages = async () => {
        if (loading || !hasMore) return
        setLoading(true)
        const nextPage = page + 1
        setPage(nextPage)
        const response = await request({ route: `/message/${chat.id}?page=${nextPage}`, method: 'GET' })
        if (response.status !== 200) return
        
        const newMessages = response.data.messages
        setMessages(prevMessages => [...newMessages, ...prevMessages])
        setHasMore(response.data.pager.page < response.data.pager.totalPages)
        setLoading(false)

    }

    useEffect(() => {
        if (!chat || !me) return

        try {
            const socket = io(config.apiBaseUrl, {
                transports: ['websocket', 'polling']
            })

            socketRef.current = socket

            socket.on('connect', () => {
                socket.emit('join-group', { groupId: chat.id })
            })

            socket.on('connect_error', (error) => {
                console.error('Connection error:', error)
            })

            socket.on('usersTyping', ({ users }) => {
                setTypingUsers(users.filter(user => user.id !== me.id))
            })

            socket.on('receiveMessage', ({ message, attachments, tempId }) => {
                updateMessages(message, attachments, tempId)
            })

            return () => {
                socket.disconnect()
            }

        } catch (error) {
            console.error('Error connecting to socket:', error)
        }

    }, [chat, me])

    return (
        <ChatScreenContext.Provider value={{ messages, setMessages, socket: socketRef.current, chat, me, loadMoreMessages, loading, hasMore }}>
            <ChatMessages />
            <ChatInput userInput={userInput} typingUsers={typingUsers} setUserInput={setUserInput} />
        </ChatScreenContext.Provider>
    )
}