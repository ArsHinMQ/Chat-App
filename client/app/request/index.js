// request.js
import config from '../config'
import objectToFormData from '../utils/object2formdata'

export async function refreshToken({ headers: additionalHeaders = {} }) {
    const res = await fetch(`${config.apiBaseUrl}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            ...additionalHeaders
        }
    })

    if (res.status === 401) {
        return false
    }

    const cookies = res.headers.get('set-cookie')
    return {
        success: true,
        cookies
    }
}

export default async function request({ route, method = 'GET', body = null, query = {}, withAuth = false, headers: additionalHeaders = {}, isFormData = false }) {
    const url = new URL(`${config.apiBaseUrl}${route}`)

    // Add query params to the URL
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
                // For arrays, append each value with the same key
                value.forEach(item => {
                    if (item !== undefined && item !== null) {
                        url.searchParams.append(key, item)
                    }
                })
            } else {
                url.searchParams.append(key, value)
            }
        }
    })

    const headers = {
        ...additionalHeaders
    }

    if (!isFormData) {
        headers['Content-Type'] = 'application/json'
    }
    
    const options = {
        credentials: 'include',
        method,
        headers,
    }

    if (isFormData) {
        // If body is already a  FormData object, use it directly
        options.body = body instanceof FormData ? body : objectToFormData(body)
    } else if (body && method !== 'GET') {
        options.body = JSON.stringify(body)
    }

    const response = await fetch(url.toString(), options)

    if (response.status === 401 && withAuth) {
        const refreshResult = await refreshToken({ headers: additionalHeaders })
        additionalHeaders['Cookie'] = refreshResult.cookies
        if (refreshResult && refreshResult.success) {
            // Return both the retry result and the cookies to be set
            const retryResult = await request({ route, method, body, query, withAuth, headers: additionalHeaders })
            return {
                ...retryResult,
                cookies: refreshResult.cookies
            }
        }
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return {
            status: response.status,
            success: false,
            error: errorData,
        }
    }

    return {
        success: true,
        status: response.status,
        data: await response.json().catch(() => ({})),
    }
}
