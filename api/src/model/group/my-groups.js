import zod from 'zod'
import { PagerResponse } from '#src/model/common/pager.js'

const MyGroupsItemResponse = zod.object({
    id: zod.string(),
    name: zod.string().min(1).max(100),
    thumbnailURI: zod.string().optional(),
    lastMessage: zod.string().optional(),
})

const MyGroupsResponse = zod.object({
    groups: zod.array(MyGroupsItemResponse),
    pager: PagerResponse
})

export { MyGroupsResponse, MyGroupsItemResponse } 