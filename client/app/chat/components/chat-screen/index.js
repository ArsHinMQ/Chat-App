'use client'

import { useRef, useState } from "react"
import ChatScreenContext from "./context"
import ChatInput from "./input"
import ChatMessages from "./messages/index"

export default function ChatScreen() {
    const [messages, setMessages] = useState([
        {
            'id': 1,
            'fromMe': true,
            'user': {
                'id': 1,
                'username': 'Anna',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'Hello There, Sam. Will you be there?',
            'sentAt': '2021-09-01T12:00:00',
            'status': 'seen'
        },
        {
            'id': 2,
            'fromMe': false,
            'user': {
                'id': 5,
                'username': 'Bill',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'I’ll try my best to make it.',
            'sentAt': '2021-09-01T12:02:00',
            'status': ''
        },
        {
            'id': 3,
            'fromMe': false,
            'user': {
                'id': 6,
                'username': 'Fatem',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'When?',
            'sentAt': '2021-09-01T12:02:30',
            'status': ''
        },
        {
            'id': 2,
            'fromMe': false,
            'user': {
                'id': 2,
                'username': 'Sam',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'I’ll try my best to make it.',
            'sentAt': '2021-09-01T12:02:00',
            'status': ''
        },
        {
            'id': 3,
            'fromMe': false,
            'user': {
                'id': 2,
                'username': 'Sam',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'When?',
            'sentAt': '2021-09-01T12:02:30',
            'status': ''
        },
        {
            'id': 2,
            'fromMe': false,
            'user': {
                'id': 2,
                'username': 'Sam',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'I’ll try my best to make it.',
            'sentAt': '2021-09-01T12:02:00',
            'status': ''
        },
        {
            'id': 3,
            'fromMe': false,
            'user': {
                'id': 2,
                'username': 'Sam',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'When?',
            'sentAt': '2021-09-01T12:02:30',
            'status': ''
        },
        {
            'id': 2,
            'fromMe': false,
            'user': {
                'id': 2,
                'username': 'Sam',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'I’ll try my best to make it.',
            'sentAt': '2021-09-01T12:02:00',
            'status': ''
        },
        {
            'id': 3,
            'fromMe': false,
            'user': {
                'id': 2,
                'username': 'Sam',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'When?',
            'sentAt': '2021-09-01T12:02:30',
            'status': ''
        },
        {
            'id': 2,
            'fromMe': false,
            'user': {
                'id': 3,
                'username': 'Abigil',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'I’ll try my best to make it.',
            'sentAt': '2021-09-01T12:02:00',
            'status': ''
        },
        {
            'id': 3,
            'fromMe': false,
            'user': {
                'id': 3,
                'username': 'Abigil',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'When?',
            'sentAt': '2021-09-01T12:02:30',
            'status': ''
        },
        {
            'id': 3,
            'fromMe': false,
            'user': {
                'id': 3,
                'username': 'Abigil',
                'avatar': 'https://randomuser.me/api/port'
            },
            'text': 'Cause my love, my love my love, all mine, my love my love. Nothing in the world belongs to be but my love. my my all mine!',
            'sentAt': '2021-09-01T12:02:30',
            'status': ''
        }
    ])

    return (
        <ChatScreenContext.Provider value={{ messages, setMessages }}>
            <ChatMessages />
            <ChatInput />
        </ChatScreenContext.Provider>
    )
}