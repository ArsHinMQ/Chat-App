import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true, default: uuidv4 },
    username: { type: String, required: true },
    email: { type: String, required: function () { return !this.isDeleted }, unique: true },
    hashedPassword: { type: String, required: function () { return !this.isDeleted } },
    createdAt: { type: Date, default: Date.now },
    thumbnailURI: { type: String },
    lastOnline: { type: Date, default: Date.now },
    status: { type: String, default: 'online' },
    bio: { type: String },
    isDeleted: { type: Boolean, default: false }
})


const User = mongoose.model("User", userSchema)
export default User