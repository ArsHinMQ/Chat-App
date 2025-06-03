import express from 'express'
import * as dbUser from '#src/db/operation/user.js'
import { generateToken, verifyToken, TokenKeyEnum } from '#src/helper/auth/jwt.js'
import { hashPassword, comparePassword } from '#src/helper/auth/password.js'
import { generateOTP } from '#src/helper/auth/otp.js'
import { SignupRegisterRequest } from '#src/model/auth/signup-register.js'
import { LoginRequest, LoginResponse } from '#src/model/auth/login.js'
import { RefreshTokenResponse } from '#src/model/auth/refresh-token.js'
import { SignupEmailRequest } from '#src/model/auth/signup-email.js'
import { SignupVerifyRequest, SignupVerifyResponse } from '#src/model/auth/signup-verify.js'
import { withErrorHandling } from '#src/error/error-handler.js'
import parseRequestBody from '#src/helper/parse-request-body.js'
import sendSignupEmail from '#src/email/operation/signup.js'
import { OTPTokenTypeEnum } from '#src/db/model/otp-token.js'
import * as dbOTPToken from '#src/db/operation/otp-token.js'
import authenticate from '#src/middleware/authenticate.js'
import { deleteFile } from '#src/utils/uploader.js'

const router = express.Router()


router.post('/signup/email', withErrorHandling(async (req, res) => {
    const { email } = parseRequestBody(SignupEmailRequest, req.body)

    if ((await dbUser.doesUserExist(email))) {
        throw new Error('USER_EXISTS')
    }
    const otpToken = await dbOTPToken.findOTPToken(email, OTPTokenTypeEnum.Signup)
    if (otpToken) {
        throw new Error('OTP_ALREADY_SENT')
    }

    const otp = generateOTP()
    await dbOTPToken.createOTPToken(email, await hashPassword(otp), OTPTokenTypeEnum.Signup)
    if (!(await sendSignupEmail(email, otp)))
        throw new Error('EMAIL_SEND_FAILED')
    res.status(204).send()

}))


router.post('/signup/verify', withErrorHandling(async (req, res) => {
    const { email, otp } = parseRequestBody(SignupVerifyRequest, req.body)

    if (await dbUser.doesUserExist(email)) {
        throw new Error('USER_EXISTS')
    }

    const otpToken = await dbOTPToken.findOTPToken(email, OTPTokenTypeEnum.Signup)
    if ((!otpToken || otpToken.attempts >= 3 || !comparePassword(otp, otpToken.hashOTP) || otpToken.isUsed)) {
        await dbOTPToken.increaseOTPTokenAttempts(email, OTPTokenTypeEnum.Signup)
        throw new Error('INVALID_OTP')
    }

    await dbOTPToken.markOTPTokenAsUsed(email, OTPTokenTypeEnum.Signup)
    return res.status(200).json(SignupVerifyResponse.parse({ registerToken: generateToken({ email }, TokenKeyEnum.enum.Register) }))
}))


router.post('/signup/register', withErrorHandling(async (req, res) => {
    const { email, username, password, token } = parseRequestBody(SignupRegisterRequest, req.body)

    try {
        const decoded = verifyToken(token, TokenKeyEnum.enum.Register)
        if (decoded.email !== email) {
            throw new Error('INVALID_TOKEN')
        }
    } catch (e) {
        throw new Error('INVALID_TOKEN')
    }

    if (await dbUser.doesUserExist(email)) {
        throw new Error('USER_EXISTS')
    }

    const hashedPassword = await hashPassword(password)

    try {
        dbUser.createUser(username, email, hashedPassword)
    } catch (error) {
        throw new Error('USER_CREATION_FAILED')
    }
    res.status(201).send()
}))

router.post('/login', withErrorHandling(async (req, res) => {
    const { email, password } = parseRequestBody(LoginRequest, req.body)
    let user = undefined
    try {
        user = await dbUser.getUserByEmail(email)
    } catch (error) {
        throw new Error('INVALID_CREDENTIALS')
    }
    if (!user) {
        throw new Error('INVALID_CREDENTIALS')
    }
    if (!comparePassword(password, user.hashedPassword)) {
        throw new Error('INVALID_CREDENTIALS')
    }

    const token = generateToken({ email, id: user.id }, TokenKeyEnum.enum.Access)
    const refreshToken = generateToken({ email, id: user.id }, TokenKeyEnum.enum.Refresh)

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hour
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(200).json(LoginResponse.parse({ token, refreshToken, email, id: user.id }))
}))

router.post('/refresh-token', withErrorHandling((req, res) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
        throw new Error('UNAUTHORIZED')
    }
    let decoded
    try {
        decoded = verifyToken(refreshToken, TokenKeyEnum.enum.Refresh)
    } catch (error) {
        throw new Error('UNAUTHORIZED')
    }
    if (!decoded) {
        throw new Error('UNAUTHORIZED')
    }
    const { email, id } = decoded
    const user = dbUser.getUserByID(id)
    if (!user) {
        throw new Error('UNAUTHORIZED')
    }
    const newAccessToken = generateToken({ email, id }, TokenKeyEnum.enum.Access)
    res.cookie('token', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hour
    })
    return res.status(200).json(RefreshTokenResponse.parse({ token: newAccessToken, email, id }))
}))

router.post('/forgot-password', withErrorHandling((req, res) => {
    // TODO: IMPLEMENT
    return res.status(418).send()
}))
router.post('/reset-password', withErrorHandling((req, res) => {
    // TODO: IMPLEMENT
    return res.status(418).send()
}))

router.delete('/delete-account', authenticate, withErrorHandling(async (req, res) => {
    if (req.user.thumbnailURI) {
        deleteFile(req.user.thumbnailURI)
    }

    await dbUser.deleteUser(req.user.id)
    

    res.clearCookie('token')
    res.clearCookie('refreshToken')
    res.status(204).send()
}))

export default router