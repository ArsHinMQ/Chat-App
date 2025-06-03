import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const template = JSON.parse(readFileSync(join(__dirname, './template.json'), 'utf8'))


export default function getTemplate(type) {
    return template[type]
}