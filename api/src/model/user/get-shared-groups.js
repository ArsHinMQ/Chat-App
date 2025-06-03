import zod from 'zod'


const GetSharedGroupsGroupResponse = zod.object({
    id: zod.string(),
    name: zod.string(),
    thumbnail: zod.string().optional(),
})

const GetSharedGroups = zod.object({
    with: zod.string(),
    groups: zod.array(GetSharedGroupsGroupResponse),
})

export { GetSharedGroups, GetSharedGroupsGroupResponse }