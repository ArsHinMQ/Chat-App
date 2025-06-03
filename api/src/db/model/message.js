import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'

const AttachmentType = {
    Image: 'image',
    Video: 'video',
    Voice: 'voice',
    File: 'file',
}

const AttachmentSchema = new mongoose.Schema({
    type: { type: String, enum: Object.values(AttachmentType), required: true },
    uri: { type: String, required: true }
})

const MessageSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true, default: uuidv4 },
    content: { 
        type: String, 
        required: function() {
            return !this.attachments || this.attachments.length === 0;
        }
    },
    sentAt: { type: Date, default: Date.now },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    isRead: { type: Boolean, default: false },
    attachments: { 
        type: [AttachmentSchema], 
        default: [],
        validate: {
            validator: function(attachments) {
                return attachments.length > 0 || this.content;
            },
            message: 'Either content or at least one attachment must be provided'
        }
    }
})

const Message = mongoose.model('Message', MessageSchema)

export default Message
export { AttachmentType }