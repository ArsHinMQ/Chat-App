// models/Group.js
import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'


const MemberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    }
}, { _id: false })


const GroupSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true, default: uuidv4 },
    name: { type: String, required: true },
    thumbnailURI: { type: String },
    description: { type: String },
    type: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    categoryKeys: {
        type: [String],
        validate: {
            validator: (arr) => arr.length >= 1 && arr.length <= 3,
            message: 'Group must have between 1 and 3 categories'
        }
    },
    members: {
        type: [MemberSchema],
        default: []
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
})

const Group = mongoose.model('Group', GroupSchema)
export default Group