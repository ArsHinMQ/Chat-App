export default function parseRequestBody(Model, body) {
    const { success, data, error } = Model.safeParse(body)
    if (!success) {
        throw new Error('INVALID_BODY')
    }
    return data
}