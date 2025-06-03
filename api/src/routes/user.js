import { withErrorHandling } from '#src/error/error-handler.js'
import authenticate from '#src/middleware/authenticate.js'
import express from 'express'
import * as dbUser from '#src/db/operation/user.js'
import * as dbGroup from '#src/db/operation/group.js'
import { GetUserProfileResponse } from '#src/model/user/get-user-profile.js'
import { GetMyProfileResponse } from '#src/model/user/get-my-profile.js'
import { EditMyProfileRequest } from '#src/model/user/edit-my-profile.js'
import { GetSharedGroups } from '#src/model/user/get-shared-groups.js'
import multer from 'multer'
import parseRequestBody from '#src/helper/parse-request-body.js'
import { deleteFile, uploadFile } from '#src/utils/uploader.js'

const router = express.Router()

const upload = multer({ dest: 'uploads/user/' })

router.get('/me', authenticate, withErrorHandling(async (req, res) => {
    const me = await dbUser.getUserByID(req.user.id)

    if (!me) {
        throw new Error('NOT_FOUND')
    }

    return res.status(200).json(GetMyProfileResponse.parse({
        id: me.id,
        username: me.username,
        thumbnail: me.thumbnailURI,
        bio: me.bio ?? '',
        email: me.email
    }))
}))

router.get('/:id', authenticate, withErrorHandling(async (req, res) => {
    const userId = req.params.id

    const user = await dbUser.getUserByID(userId)

    if (!user) {
        throw new Error('NOT_FOUND')
    }

    return res.status(200).json(GetUserProfileResponse.parse({
        id: user.id,
        username: user.username,
        thumbnail: user.thumbnailURI,
        bio: user.bio
    }))
}))

router.get('/:id/shared-groups', authenticate, withErrorHandling(async (req, res) => {
    const { id: userId } = req.params
    const myId = req.user._id

    const user = await dbUser.getUserByID(userId)

    if (!user) {
        throw new Error('NOT_FOUND')
    }

    const groups = await dbGroup.getGroupsWithUsersInThem([user._id, myId])

    return res.status(200).json(GetSharedGroups.parse({
        with: userId,
        groups: groups.map(group => ({
            id: group.id,
            name: group.name,
            thumbnail: group.thumbnailURI
        }))
    }))
}))

router.put('/', authenticate, upload.single('thumbnail'), (async (req, res) => {
    const me = req.user
    const { username, bio } = parseRequestBody(EditMyProfileRequest, req.body)

    const thumbnailFile = req.file
    let thumbnailURI = undefined
    if (thumbnailFile) {
        thumbnailURI = uploadFile('user', thumbnailFile)
    }
    if (thumbnailURI && me.thumbnailURI) {
        deleteFile(me.thumbnailURI)
    }

    await dbUser.updateUser(me, username, thumbnailURI ?? me.thumbnailURI, bio)
    return res.status(204).send()
}))

export default router