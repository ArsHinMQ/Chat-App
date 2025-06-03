import { verifyToken, TokenKeyEnum } from "#src/helper/auth/jwt.js"
import * as dbUser from "#src/db/operation/user.js"
import { sendErrorResponse } from "#src/error/helper.js"

export default async function authenticate(req, res, next) {
    const { token } = req.cookies
    if (!token) {
        return sendErrorResponse(res, 'UNAUTHORIZED')
    }
    try {
        const decoded = verifyToken(token, TokenKeyEnum.enum.Access)
        const user = await dbUser.getUserByID(decoded?.id)
        if (!user) {
            return sendErrorResponse(res, 'UNAUTHORIZED')
        }
        req.user = user
        next()
    } catch (error) {
        return sendErrorResponse(res, 'UNAUTHORIZED')
    }
}