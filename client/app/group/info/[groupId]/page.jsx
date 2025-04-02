import GroupInfoPage from '@/app/group/info/components/index'

const group = {
    id: 1,
    name: "Test Group",
    description: "This is a test group description.",
    categories: [
        {
            id: 1,
            name: "Study",
        },
        {
            id: 2,
            name: "Gaming"
        }
    ],
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png',
    members: [
        {
            id: 1,
            name: "John Doe",
            thumbnail: 'https://example.com/john.jpg'
        },
        {
            id: 2,
            name: "Fatemeh",
            thumbnail: 'https://example.com/jane.jpg'
        }
    ],
}

export default function GroupInfo() {
    return <GroupInfoPage group={group} />
}