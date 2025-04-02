import UserProfilePage from '@/app/user/[userId]/components/index'

const USER_DATA = {
    id: 1,
    username: "Gojo Satoru",
    thumbnail: 'https://static.beebom.com/wp-content/uploads/2024/04/Gojo-comeback.jpg?w=1168&quality=75',
    bio: "This is a test user bio.",
    sharedGroups: [
        {
            id: 1,
            name: "Test Group",
            thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'
        },
        {
            id: 2,
            name: "Another Group",
            thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'
        }
    ]
}

export default function UserProfile() {
    return (
        <UserProfilePage user={USER_DATA} />
    )
}