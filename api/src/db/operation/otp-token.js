import OTPToken from '#src/db/model/otp-token.js'

export async function createOTPToken(email, hashOTP, type) {
    const otpToken = new OTPToken({ email, hashOTP, type })
    await otpToken.save()
    return otpToken
}

export async function findOTPToken(email, type) {
    const otpToken = await OTPToken.findOne({ email, type })
    return otpToken
}

export async function increaseOTPTokenAttempts(email, type) {
    const otpToken = await OTPToken.findOneAndUpdate({ email, type }, { $inc: { attempts: 1 } }, { new: true })
    return otpToken
}

export async function markOTPTokenAsUsed(email, type) {
    const otpToken = await OTPToken.findOneAndUpdate({ email, type }, { $set: { isUsed: true } }, { new: true })
    return otpToken
}