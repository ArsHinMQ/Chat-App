import zod from 'zod'

const GetUserProfileResponse = zod.object({
    id: zod.string(),
    thumbnail: zod.string().optional(),
    username: zod.string(),
    bio: zod.string().optional(),
})

export { GetUserProfileResponse }