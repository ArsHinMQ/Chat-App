import express from 'express'
import authenticate from '#src/middleware/authenticate.js'
import { withErrorHandling } from '#src/error/error-handler.js'
import * as dbMessage from '#src/db/operation/message.js'
import Pager from '#src/utils/pager.js'
import { ListMessageResponse } from '#src/model/message/list-message.js'
import { AttachmentType } from '#src/db/model/message.js'
import multer from 'multer'
import { uploadFile } from '#src/utils/uploader.js'
import { MessageAttachmentResponse } from '#src/model/message/message-attachment.js'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/message/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
})


router.get('/:groupId', authenticate, (async (req, res) => {
    const limit = 10
    const { page = 1 } = req.query
    const pager = new Pager(page, limit)

    const { messages: dbMessages, totalMessages } = await dbMessage.getMessages(req.params.groupId, pager)
    pager.totalItems = totalMessages

    const messages = dbMessages.map(message => ({
        id: message.id,
        text: message.content,
        sentAt: message.sentAt,
        fromMe: (message.sender) ? message.sender.id === req.user.id : false,
        status: (message.isRead && message.sender) ? message.sender.id === req.user.id ? 'read' : 'sent' : 'sent',
        sender: message.sender,
        attachments: message.attachments,
    }))

    return res.status(200).json(ListMessageResponse.parse({
        messages: messages.reverse(),
        pager: pager.getResponse(),
    }))
}))


router.post('/attachment/:type', authenticate, upload.single('file'), withErrorHandling(async (req, res) => {
    const { type } = req.params
    const attachmentFile = req.file
    if (!attachmentFile) {
        throw new BadRequestError('NO_FILE_UPLOADED')
    }

    if (!Object.values(AttachmentType).includes(type)) {
        throw new BadRequestError('INVALID_ATTACHMENT_TYPE')
    }

    const attachmentURI = uploadFile('message', attachmentFile)

    return res.status(200).json(MessageAttachmentResponse.parse({
        uri: attachmentURI,
    }))
}))

export default router