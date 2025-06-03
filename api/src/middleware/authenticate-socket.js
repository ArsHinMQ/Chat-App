import { TokenKeyEnum, verifyToken } from "#src/helper/auth/jwt.js"
import * as dbUser from "#src/db/operation/user.js"

export default async function authenticateSocket(socket, next) {
    const cookies = socket.handshake.headers.cookie?.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=')
        acc[key] = value
        return acc
    }, {})

    const token = socket.handshake.auth.token || cookies?.token

    if (!token) {
        return next(new Error('Authentication error: No token'))
    }

    try {
        const decoded = verifyToken(token, TokenKeyEnum.enum.Access)
        const user = await dbUser.getUserByID(decoded?.id)
        socket.user = user
        next()
    } catch (err) {
        return next(new Error('Authentication error: Invalid token'))
    }
}