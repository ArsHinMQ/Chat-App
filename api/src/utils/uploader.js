import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import mime from 'mime-types'

const UPLOAD_DIR = 'files/'

export function uploadFile(section, file) {
    if (!file) throw new Error('No file provided')

    const dest = UPLOAD_DIR + section + '/'

    const ext = path.extname(file.originalname) || mime.extension(file.mimetype) || '.bin'
    const filename = uuidv4() + (ext ? `.${ext}` : '')
    const destPath = path.join(dest, filename)

    // Move file from temp location to permanent uploads folder
    fs.renameSync(file.path, destPath)

    // Return URL or path (in production you'd probably return a CDN URL)
    return `/${UPLOAD_DIR}${section}/${filename}`
}

export function deleteFile(uri) {
    try {
        fs.unlink(`./${uri}`, (err) => {
            if (err) {
                console.error('Error deleting file:', err)
            }
        })
    } catch {
        console.error('Error deleting file:')
    }
}
