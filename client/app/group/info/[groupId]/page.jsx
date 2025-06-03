import GroupInfoPage from '@/app/group/info/components/index'

export default async function GroupInfo({ params }) {
    const { groupId } = await params
    return <GroupInfoPage groupId={groupId} />
}