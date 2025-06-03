import zod from 'zod'


const LoginRequest = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
})

const LoginResponse = zod.object({
    id: zod.string(),
    email: zod.string().email(),
    token: zod.string(),
    refreshToken: zod.string(),
})


export { LoginRequest, LoginResponse }