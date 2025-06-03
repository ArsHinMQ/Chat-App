import zod from 'zod'
import { PagerResponse } from '#src/model/common/pager.js'

const ListGroupQuery = zod.object({
    page: zod.coerce.number().optional(),
    categories: zod.array(zod.string()).optional(),
})

const ListGroupsItemResponse = zod.object({
    id: zod.string(),
    name: zod.string().min(1).max(100),
    thumbnailURI: zod.string().optional(),
    description: zod.string().optional(),
    categories: zod.array(zod.string()),
    members: zod.number()
})

const ListGroupsResponse = zod.object({
    groups: zod.array(ListGroupsItemResponse),
    pager: PagerResponse
})

export { ListGroupsResponse, ListGroupsItemResponse, ListGroupQuery }