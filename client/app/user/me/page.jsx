import MyProfilePage from '@/app/user/me/components/index'

const me = {
    id: 42,
    username: 'Geto Suguru',
    thumbnail: undefined,
    bio: 'This is a test user bio.',
    email: 'geto.suguru@jujutsu.kaisen'
}

export default function MyProfile() {
    return (
        <MyProfilePage user={me} />
    )
}