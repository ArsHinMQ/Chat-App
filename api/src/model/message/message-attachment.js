import zod from 'zod'

const MessageAttachmentResponse = zod.object({
    uri: zod.string(),
})

export { MessageAttachmentResponse }