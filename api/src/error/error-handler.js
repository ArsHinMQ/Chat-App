import { sendErrorResponse } from "#src/error/helper.js"

export function withErrorHandling(handler) {
    return async (req, res) => {
        try {
            await handler(req, res)
        } catch (error) {
            return sendErrorResponse(res, error?.message ?? 'INTERNAL_SERVER_ERROR')
        }
    }
}
