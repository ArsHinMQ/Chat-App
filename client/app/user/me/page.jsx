import MyProfilePage from '@/app/user/me/components/index'
import { cookies } from 'next/headers'
import request from '@/app/request'

const getMe = async () => {
    const cookieStore = await cookies()
    const res = await request({
        route: '/user/me',
        method: 'GET',
        withAuth: true,
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if (!res.success) {
        throw new Error('Failed to get me')
    }

    return res.data
}

export default async function MyProfile() {
    const me = await getMe()
    return (
        <MyProfilePage user={me} />
    )
}