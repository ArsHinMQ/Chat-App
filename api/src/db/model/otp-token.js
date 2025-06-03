import mongoose from 'mongoose'

const OTPTokenTypeEnum = {
    Signup: 'signup',
    ResetPassword: 'reset-password'
}

const otpTokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    hashOTP: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(OTPTokenTypeEnum)
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 3 // 3 minutes
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    attempts: {
        type: Number,
        default: 0
    }
})

const OTPToken = mongoose.model('OTPToken', otpTokenSchema)

export default OTPToken
export { OTPTokenTypeEnum }