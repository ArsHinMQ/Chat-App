import 'dotenv/config'

import express from 'express'
import cookieParser from 'cookie-parser'

import auth from '#src/routes/auth.js'
import group from '#src/routes/group.js'
import category from '#src/routes/category.js'
import user from '#src/routes/user.js'
import file from '#src/routes/file.js'
import message from '#src/routes/message.js'

import connectDB from '#src/db/config.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'
import registerSocketHandlers from '#src/chat/index.js'
import authenticateSocket from '#src/middleware/authenticate-socket.js'

const app = express()
const server = createServer(app)

// Configure CORS for both Express and Socket.IO
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
})


connectDB()

app.use(express.json())
app.use(cookieParser())
app.use('/auth', auth)
app.use('/group', group)
app.use('/category', category)
app.use('/user', user)
app.use('/message', message)
app.use('/', file)

registerSocketHandlers(io)
io.use(authenticateSocket)

const port = 8000
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
