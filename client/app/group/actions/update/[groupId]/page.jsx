import UpdateGroupPage from '@/app/group/actions/update/components/update-group'

const TEMP_DATA = {
    currentGroupName: 'Test Group',
    currentGroupCategories: [
        {
            id: 1,
            name: "Study",
        },
        {
            id: 2,
            name: "Gaming"
        }
    ],
    currentGroupThumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png',
    currentGroupDescription: 'This is a test group description.'
}

export default function UpdateGroup() {
    return <UpdateGroupPage currentGroupDescription={TEMP_DATA.currentGroupDescription} currentGroupName={TEMP_DATA.currentGroupName} currentGroupCategories={TEMP_DATA.currentGroupCategories} currentGroupThumbnail={TEMP_DATA.currentGroupThumbnail} />
}