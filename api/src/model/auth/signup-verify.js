import zod from 'zod'

const SignupVerifyRequest = zod.object({
    email: zod.string().email(),
    otp: zod.string().min(6).max(6),
})

const SignupVerifyResponse = zod.object({
    registerToken: zod.string(),
})

export { SignupVerifyRequest, SignupVerifyResponse }