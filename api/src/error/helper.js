import errors from '#src/error/errors.json' with { type: 'json' }

export const getError = (error) => {
    return errors[error] || error['UNKNOWN_ERROR']
}

export const sendErrorResponse = (res, error_text) => {
    console.error(error_text)
    console.error(getError(error_text))

    const error = getError(error_text) ?? getError('UNKNOWN_ERROR')
    return res.status(error.status).json(error)
}

export const sendErrorResponseSocket = (error_code) => {
    return getError(error_code) ?? getError('UNKNOWN_ERROR')
}