"use client"

import ChatInputTextArea from "./input-textarea"
import ChatInputEmojiPicker from './emoji-picker'
import { useContext, useState } from 'react'
import ChatInputSendButton from "./send-button"
import ChatScreenContext from "../context"
import ChatInputIsTyping from "./is-typing"
import { v4 as uuidv4 } from 'uuid'
import ChatInputVoiceRecorderButton from "./voice-recorder-button"
import request from "@/app/request"

export default function ChatInput({ userInput, typingUsers, setUserInput }) {
    const { setMessages, socket, me } = useContext(ChatScreenContext)
    const [inRecordingMode, setInRecordingMode] = useState(false)
    const [cursorPosition, setCursorPosition] = useState(0)

    const handleUploadRecording = async (blob) => {
        const tempId = uuidv4()
        
        const formData = new FormData()
        // Get file extension based on MIME type
        const extension = blob.type.split('/')[1] || 'webm' // Default to webm if type is not available
        const filename = `voice.${extension}`
        formData.append('file', blob, filename)

        const res = await request({
            route: `/message/attachment/voice`,
            method: 'POST',
            withAuth: true,
            isFormData: true,
            body: formData
        })

        if (res.status !== 200) {
            return false
        }

        const attachment = res.data
        const attachmentURI = attachment?.uri

        if (!attachmentURI) {
            return false
        }

        setMessages(prev => {
            return [...prev, {
                id: null,
                tempId: tempId,
                text: '',
                fromMe: true,
                sentAt: new Date().toISOString(),
                status: 'sending',
                sender: {
                    id: me.id,
                    username: me.username,
                    thumbnailURI: me.thumbnailURI
                },
                attachments: [{
                    type: 'voice',
                    uri: attachmentURI
                }]
            }]
        })
        socket.emit('send-message', { message: '', attachments: [{ type: 'voice', uri: attachmentURI }], tempId })
        return true
    }

    const sendMessage = () => {
        const message = userInput.trim()
        setUserInput('')
        if (message === '') return

        const tempId = uuidv4()
        setMessages(prev => {
            return [...prev, {
                id: null,
                tempId: tempId,
                text: message,
                fromMe: true,
                sentAt: new Date().toISOString(),
                status: 'sending',
                sender: {
                    id: me.id,
                    username: me.username,
                    thumbnailURI: me.thumbnailURI
                },
                attachments: []
            }]
        })

        socket.emit('send-message', { message, tempId })
    }

    return (
        <div className="fixed z-10 bottom-0 w-full md:w-[calc(100%-20rem)]">
            <ChatInputIsTyping socket={socket} userInput={userInput} typingUsers={typingUsers} />
            <div className="w-full bg-white flex items-center px-4 py-3 px-[18px]">
                <ChatInputEmojiPicker userInput={userInput} setUserInput={setUserInput} cursorPosition={cursorPosition} setCursorPosition={setCursorPosition} />
                <ChatInputTextArea inRecordingMode={inRecordingMode} sendMessage={sendMessage} userInput={userInput} setUserInput={setUserInput} cursorPosition={cursorPosition} setCursorPosition={setCursorPosition} />
                <ChatInputSendButton sendMessage={sendMessage} userInput={userInput} />
                <ChatInputVoiceRecorderButton setInRecordingMode={setInRecordingMode} onUploadRecording={handleUploadRecording} userInput={userInput} />
            </div>
        </div>
    )
}