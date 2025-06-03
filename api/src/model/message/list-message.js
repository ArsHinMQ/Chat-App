import zod from 'zod'
import { PagerResponse } from '#src/model/common/pager.js'
import { AttachmentType } from '#src/db/model/message.js'

const ListMessageSenderResponse = zod.object({
    id: zod.string(),
    username: zod.string(),
    thumbnailURI: zod.string().optional(),
})

const ListMessageItemResponse = zod.object({
    id: zod.string(),
    text: zod.string(),
    sentAt: zod.date(),
    fromMe: zod.boolean(),
    // TODO: implement read status
    status: zod.enum(['sending', 'sent', 'read']),
    sender: zod.nullable(ListMessageSenderResponse),
    attachments: zod.array(zod.object({
        type: zod.enum(Object.values(AttachmentType)),
        uri: zod.string(),
        thumbnailURI: zod.string().optional(),
    })),
})

const ListMessageResponse = zod.object({
    messages: zod.array(ListMessageItemResponse),
    pager: PagerResponse
})

export { ListMessageResponse, ListMessageItemResponse, ListMessageSenderResponse }