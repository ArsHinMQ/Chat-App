import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

// Serve files from the uploads directory
router.use('/files', express.static(path.join(__dirname, '../../files')))

export default router