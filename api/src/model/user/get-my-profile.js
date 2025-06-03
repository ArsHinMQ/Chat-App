import zod from 'zod'

const GetMyProfileResponse = zod.object({
    id: zod.string(),
    thumbnail: zod.string().optional(),
    username: zod.string(),
    bio: zod.string().optional(),
    email: zod.string(),
})

export { GetMyProfileResponse }