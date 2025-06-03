import zod from 'zod'

const SignupEmailRequest = zod.object({
    email: zod.string().email()
})

export { SignupEmailRequest }