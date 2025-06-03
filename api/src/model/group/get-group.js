import zod from 'zod'


const GetGroupCategoryResponse = zod.object({
    key: zod.string(),
    name: zod.string().min(1).max(100),
})

const GetGroupResponse = zod.object({
    id: zod.string(),
    name: zod.string().min(1).max(100),
    thumbnailURI: zod.string().optional(),
    description: zod.string().optional(),
    categories: zod.array(GetGroupCategoryResponse),
    numberOfMembers: zod.number().optional(),
    amIJoined: zod.boolean().optional(),
    myRole: zod.enum(['admin', 'member']).optional(),
})

export { GetGroupResponse }