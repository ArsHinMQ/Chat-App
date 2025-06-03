import zod from 'zod'


const SignupRegisterRequest = zod.object({
    username: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(8),
    token: zod.string().min(1),
})

export { SignupRegisterRequest }