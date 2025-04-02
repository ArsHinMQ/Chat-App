"use client"

import ChatInputTextArea from "./input-textarea"
import ChatInputEmojiPicker from './emoji-picker'
import { useContext, useState } from 'react'
import ChatInputSendButton from "./send-button"
import ChatScreenContext from "../context"

export default function ChatInput() {
    const { setMessages } = useContext(ChatScreenContext)
    const [cursorPosition, setCursorPosition] = useState(0)
    const [userInput, setUserInput] = useState('')

    const sendMessage = () => {
        const message = userInput.trim()
        setUserInput('')
        if (message === '') return

        setMessages(prev => {
            return [...prev, {
                id: null,
                text: message,
                fromMe: true,
                sentAt: new Date().toISOString(),
                status: 'sending',
                user: {
                    id: 1,
                    username: 'Anna',
                    avatar: 'https://randomuser.me/api/portraits'
                }
            }]
        })
    }

    return (
        <div className="fixed bottom-0 bg-white w-full lg:w-[calc(100%-20rem)] flex items-center px-4 py-3 px-[18px]">
            <ChatInputEmojiPicker userInput={userInput} setUserInput={setUserInput} cursorPosition={cursorPosition} setCursorPosition={setCursorPosition} />
            <ChatInputTextArea sendMessage={sendMessage} userInput={userInput} setUserInput={setUserInput} cursorPosition={cursorPosition} setCursorPosition={setCursorPosition} />
            <ChatInputSendButton sendMessage={sendMessage} />
        </div>
    )
}