import zod from 'zod'

const RefreshTokenResponse = zod.object({
    id: zod.string(),
    email: zod.string().email(),
    token: zod.string()
})


export { RefreshTokenResponse }