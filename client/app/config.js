const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

if (!apiBaseUrl) {
    throw new Error(
        "Missing NEXT_PUBLIC_API_BASE_URL environment variable. " +
        "Please set it in your .env file."
    )
}

const config = {
    apiBaseUrl,
}

export default config
