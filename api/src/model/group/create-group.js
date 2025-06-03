import zod from 'zod'


const CreateGroupRequest = zod.object({
    name: zod.string().min(1).max(100),
    description: zod.string().optional(),
    categories: zod.array(zod.string()).refine((arr) => arr.length >= 1 && arr.length <= 3, {
        message: 'Group must have between 1 and 3 categories'
    }),
    type: zod.enum(['public', 'private']).optional(),
})

const CreateGroupResponse = zod.object({
    id: zod.string()
})

export { CreateGroupRequest, CreateGroupResponse }