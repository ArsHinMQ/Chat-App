import zod from 'zod'

const EditMyProfileRequest = zod.object({
    username: zod.string(),
    bio: zod.string().optional(),
})

export { EditMyProfileRequest }