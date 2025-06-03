import Message from "#src/db/model/message.js"
import { getGroupById } from "#src/db/operation/group.js"

/**
 * @typedef {Object} PopulatedMessage
 * @property {import('mongoose').Types.ObjectId} _id
 * @property {string} content
 * @property {Date} sentAt
 * @property {{id: string, username: string, thumbnailURI: string}} sender
 * @property {string} group
 * @property {boolean} isRead
 */

const getMessages = async (groupId, pager) => {
    // First get the group's MongoDB _id using the custom id
    const group = await getGroupById(groupId)

    /** @type {PopulatedMessage[]} */
    const messages = await Message.find({ group: group._id })
        .populate('sender', 'id username thumbnailURI')
        .skip(pager.offset)
        .limit(pager.limit)
        .sort({ sentAt: -1 })

    const totalMessages = await Message.countDocuments({ group: group._id })

    return { messages, totalMessages }
}

const storeMessage = async (content, sentAt, sender, group, attachments, isRead = false) => {
    const newMessage = new Message({
        content,
        sentAt,
        sender,
        group,
        isRead,
        attachments,
    })

    await newMessage.save()
    return newMessage
}

export { getMessages, storeMessage }