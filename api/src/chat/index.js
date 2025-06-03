import { storeMessage } from "#src/db/operation/message.js"
import { getGroupById } from "#src/db/operation/group.js"

// TODO: handle using redis to store typing users in groups
const typingUsersInGroups = {}

export default function registerSocketHandlers(io) {
    io.on('connection', async (socket) => {
        const user = {
            id: socket.user.id,
            username: socket.user.username,
            thumbnailURI: socket.user.thumbnailURI
        }

        socket.on('join-group', async ({ groupId }) => {
            socket.join(groupId)
            socket.groupId = groupId
            socket.group = await getGroupById(groupId)
            if (typingUsersInGroups[groupId]) {
                socket.emit('usersTyping', { users: Array.from(typingUsersInGroups[groupId]?.values() || []) })
            }
        })

        socket.on('typing', () => {
            const groupId = socket.groupId
            if (!typingUsersInGroups[groupId]) {
                typingUsersInGroups[groupId] = new Map()
            }
            typingUsersInGroups[groupId].set(user.id, user)
            socket.to(groupId).emit('usersTyping', { users: Array.from(typingUsersInGroups[groupId].values()) })
        })

        socket.on('stop-typing', () => {
            const groupId = socket.groupId
            typingUsersInGroups[groupId]?.delete(user.id)
            socket.to(groupId).emit('usersTyping', { users: Array.from(typingUsersInGroups[groupId]?.values() || []) })
        })

        socket.on('send-message', async ({ message, attachments, tempId }) => {
            const msg = {
                userId: user.id,
                message,
                sentAt: new Date().toISOString(),
                user: {
                    id: user.id,
                    username: user.username,
                    thumbnailURI: user.thumbnailURI
                },
                attachments,
            }
            const newMessage = await storeMessage(message, msg.sentAt, socket.user._id, socket.group._id, attachments)
            msg.id = newMessage.id
            io.to(socket.groupId).emit('receiveMessage', { message: msg, attachments: attachments, tempId })
        })

        socket.on('disconnect', () => {
            typingUsersInGroups[socket.groupId]?.delete(user.id)
        })
    })
}
