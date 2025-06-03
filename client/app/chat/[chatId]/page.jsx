import request from "@/app/request"
import ChatPage from "../components"
import { cookies } from "next/headers"

async function getGroupInfo(chatId) {
    const cookieStore = await cookies()
    const res = await request({
        route: `/group/${chatId}`,
        method: 'GET',
        withAuth: true,
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if (!res.success) {
        throw new Error('Failed to fetch group info')
    }

    return res.data
}


export default async function Chat({ params }) {
    const { chatId } = await params
    const chat = await getGroupInfo(chatId)
    return <ChatPage chat={chat} />
}

