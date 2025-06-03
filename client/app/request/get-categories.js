const { cookies } = require("next/headers")
const { default: request } = require(".")

export default async function getCategories() {
    const cookieStore = await cookies()
    const res = await request({
        route: '/category',
        method: 'GET',
        withAuth: true,
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if (!res.success) {
        throw new Error('Failed to fetch categories')
    }

    return res.data
}