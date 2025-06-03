import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { z } from 'zod'


const TokenKeyEnum = z.nativeEnum({ Access: 'access', Refresh: 'refresh', Register: 'register' })

const secretKeys = {
    "access": process.env.JWT_ACCESS_SECRET_KEY,
    "refresh": process.env.JWT_REFRESH_SECRET_KEY,
    "register": process.env.JWT_REGISTER_SECRET_KEY,
}

const expriresIn = {
    "access": '1h',
    "refresh": '7d',
    "register": '30m',
}

const generateToken = (data, type) => {
    const { success, data: tokenKey } = TokenKeyEnum.safeParse(type.toLowerCase())
    if (!success) {
        throw new Error('UNKOWN_ERROR')
    }
    return jwt.sign({ ...data, createdAt: new Date().toISOString() }, secretKeys[tokenKey], { expiresIn: expriresIn[tokenKey] })
}

const verifyToken = (token, type) => {
    const { success, data: tokenKey } = TokenKeyEnum.safeParse(type.toLowerCase())
    if (!success) {
        throw new Error('UNKOWN_ERROR')
    }
    return jwt.verify(token, secretKeys[tokenKey])
}

export {
    TokenKeyEnum, generateToken, verifyToken
}