import zod from 'zod'
import { PagerResponse } from '#src/model/common/pager.js'

const ListGroupMembersItemResponse = zod.object({
    id: zod.string(),
    username: zod.string().min(1).max(100),
    thumbnailURI: zod.string().optional(),
    role: zod.enum(['admin', 'member']).default('member'),
})

const ListGroupMembersResponse = zod.object({
    members: zod.array(ListGroupMembersItemResponse),
    pager: PagerResponse
})

export { ListGroupMembersItemResponse, ListGroupMembersResponse }