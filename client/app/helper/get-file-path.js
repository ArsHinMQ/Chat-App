'use client'

import config from "../config"



const getFilePath = (path) => {
    return `${config.apiBaseUrl}${path}`
}

export default getFilePath
