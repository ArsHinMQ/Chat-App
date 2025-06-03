import request from '@/app/request'
import UserProfilePage from '@/app/user/[userId]/components/index'
import { cookies } from 'next/headers'

const getUser = async (userId) => {

    const cookieStore = await cookies()

    const res = await request({
        route: `/user/${userId}`,
        method: 'GET',
        withAuth: true,
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if (!res.success) {
        throw new Error('Failed to get user')
    }

    return res.data
}

export default async function UserProfile({ params }) {
    const { userId } = await params
    const user = await getUser(userId)
    return (
        <UserProfilePage user={user} />
    )
}