import UpdateGroupPage from '@/app/group/actions/update/components/update-group'

import request from '@/app/request'
import { cookies } from 'next/headers'


async function getGroupInfo(groupId) {
    const cookieStore = await cookies()
    const res = await request({
        route: `/group/${groupId}`,
        method: 'GET',
        withAuth: true,
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    
    if (!res.success) {
        throw new Error('Failed to fetch categories')
    }
    
    return res.data
}


export default async function UpdateGroup({ params }) {
    const { groupId } = await params
    const group = await getGroupInfo(groupId)

    return <UpdateGroupPage currentGroupId={groupId} currentGroupDescription={group.description} currentGroupName={group.name} currentGroupCategories={group.categories} currentGroupThumbnail={group.thumbnailURI} />
}