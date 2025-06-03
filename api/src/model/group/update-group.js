import zod from 'zod'


const UpdateGroupRequest = zod.object({
    name: zod.string().min(1).max(100),
    description: zod.string().optional(),
    categories: zod.array(zod.string()).refine((arr) => arr.length >= 1 && arr.length <= 3, {
        message: 'Group must have between 1 and 3 categories'
    })
})

const UpdateGroupResponse = zod.object({
    id: zod.string()
})

export { UpdateGroupRequest, UpdateGroupResponse }