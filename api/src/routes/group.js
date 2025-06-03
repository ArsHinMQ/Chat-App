import { withErrorHandling } from '#src/error/error-handler.js'
import parseRequestBody from '#src/helper/parse-request-body.js'
import authenticate from '#src/middleware/authenticate.js'
import { CreateGroupRequest, CreateGroupResponse } from '#src/model/group/create-group.js'
import { UpdateGroupRequest, UpdateGroupResponse } from '#src/model/group/update-group.js'
import { KickMemberRequest } from '#src/model/group/kick-member.js'
import { ListGroupQuery, ListGroupsResponse } from '#src/model/group/list-groups.js'
import { ListGroupMembersResponse } from '#src/model/group/list-group-members.js'
import { GetGroupResponse } from '#src/model/group/get-group.js'
import { MyGroupsResponse } from '#src/model/group/my-groups.js'
import * as dbGroup from '#src/db/operation/group.js'
import * as dbUser from '#src/db/operation/user.js'
import * as dbCategory from '#src/db/operation/category.js'
import express from 'express'
import verifyGroupCategories from '#src/helper/group/verify-group-categories.js'
import Pager from '#src/utils/pager.js'
import { uploadFile, deleteFile } from '#src/utils/uploader.js'
import multer from 'multer'

const router = express.Router()

const upload = multer({ dest: 'uploads/group/' })

// Get my groups
router.get('/my', authenticate, withErrorHandling(async (req, res) => {
    const limit = 10
    const { page = 1 } = req.query
    const pager = new Pager(page, limit)

    const { groups: dbGroups, totalGroups } = await dbGroup.getMyGroups(req.user._id, pager)
    pager.totalItems = totalGroups

    const groups = dbGroups.map(group => ({
        id: group.id,
        name: group.name,
        thumbnailURI: group.thumbnailURI,
        lastMessage: "", // TODO: Implement last message functionality
    }))

    return res.status(200).json(MyGroupsResponse.parse({
        groups: groups,
        pager: pager.getResponse(),
    }))
}))

// List groups
router.get('/', authenticate, withErrorHandling(async (req, res) => {
    const limit = 5
    const query = req.query
    if (query.categories && !Array.isArray(query.categories)) {
        query.categories = [req.query.categories]
    } else if (query.categories === '') {
        query.categories = []
    }
    const { page = 1, categories = [] } = parseRequestBody(ListGroupQuery, query)

    const pager = new Pager(page, limit)

    const { groups: dbGroups, totalGroups } = await dbGroup.searchGroups(categories, pager)
    pager.totalItems = totalGroups
    const groups = dbGroups.map(group => ({
        id: group.id,
        name: group.name,
        thumbnailURI: group.thumbnailURI,
        description: group.description,
        categories: group.categoryKeys,
        members: group.members,
    }))

    return res.status(200).json(ListGroupsResponse.parse({
        groups: groups,
        pager: pager.getResponse(),
    }))
}))

// Get group by ID
router.get('/:id', authenticate, withErrorHandling(async (req, res) => {
    const groupId = req.params.id
    const group = await dbGroup.getGroupById(groupId)
    if (!group) {
        throw new Error('NOT_FOUND')
    }

    const meInGroup = group.members.find(member => member.userId.equals(req.user._id))
    const categories = await dbCategory.getCategoriesByKeys(group.categoryKeys)
    return res.status(200).json(GetGroupResponse.parse({
        id: group.id,
        name: group.name,
        description: group.description,
        thumbnailURI: group.thumbnailURI,
        categories: categories,
        members: group.members,
        createdBy: group.createdBy,
        numberOfMembers: group.members.length,
        amIJoined: meInGroup !== undefined,
        myRole: (group.createdBy.equals(req.user._id) ? 'admin' : meInGroup?.role) || undefined,
    }))
}))

// List group members
router.get('/:id/members', authenticate, withErrorHandling(async (req, res) => {
    const groupId = req.params.id
    const limit = 10
    const { page = 1 } = req.query
    const pager = new Pager(page, limit)
    const group = await dbGroup.getGroupById(groupId)
    if (!group) {
        throw new Error('NOT_FOUND')
    }

    const { users: dbMembers, totalUsers: totalMembers } = await dbUser.getUsersById(group.members.map(member => member.userId), pager)
    pager.totalItems = totalMembers

    const members = dbMembers.map(member => ({
        id: member.id,
        username: member.username,
        thumbnailURI: member.thumbnailURI,
        role: member._id.equals(group.createdBy) ? 'admin' : 'member',
    }))

    return res.status(200).json(ListGroupMembersResponse.parse({
        members: members,
        pager: pager.getResponse(),
    }
    ))
}))

// Create group
router.post('/', authenticate, upload.single('thumbnail'), withErrorHandling(async (req, res) => {
    const { name, description, categories, type } = parseRequestBody(CreateGroupRequest, req.body)

    const thumbnailFile = req.file
    let thumbnailURI = undefined
    if (thumbnailFile) {
        thumbnailURI = uploadFile('group', thumbnailFile)
    }

    verifyGroupCategories(categories)

    const group = await dbGroup.createGroup(name, thumbnailURI, description, categories, req.user._id, type)

    return res.status(201).json(CreateGroupResponse.parse({
        id: group.id,
    }))
}))


// Update group
router.put('/:id', authenticate, upload.single('thumbnail'), withErrorHandling(async (req, res) => {
    const groupId = req.params.id
    const { name, description, categories } = parseRequestBody(UpdateGroupRequest, req.body)

    const group = await dbGroup.getGroupById(groupId)
    if (!group) {
        throw new Error('NOT_FOUND')
    }
    if (!group.createdBy.equals(req.user._id)) {
        throw new Error('FORBIDDEN')
    }

    const thumbnailFile = req.file
    let thumbnailURI = undefined
    if (thumbnailFile) {
        thumbnailURI = uploadFile('group', thumbnailFile)
    }
    if (thumbnailURI && group.thumbnailURI) {
        deleteFile(group.thumbnailURI)
    }
    await verifyGroupCategories(categories)

    await dbGroup.updateGroup(group, name, thumbnailURI ? thumbnailURI : group.thumbnailURI, description, categories)
    return res.status(200).json(UpdateGroupResponse.parse({
        id: group.id,
    }))
}))

// Delete group
router.delete('/:id', authenticate, withErrorHandling(async (req, res) => {
    const groupId = req.params.id

    const group = await dbGroup.getGroupById(groupId)
    if (!group) {
        throw new Error('NOT_FOUND')
    }
    if (!group.createdBy.equals(req.user._id)) {
        throw new Error('FORBIDDEN')
    }

    if (group.thumbnailURI) {
        deleteFile(group.thumbnailURI)
    }

    await dbGroup.deleteGroup(groupId)

    return res.status(204).send()
}))

// Join group
router.post('/:id/join', authenticate, withErrorHandling(async (req, res) => {
    const groupId = req.params.id
    const group = await dbGroup.getGroupById(groupId)
    if (!group) {
        throw new Error('NOT_FOUND')
    }

    await dbGroup.addMemberToGroup(group, req.user._id)

    return res.status(204).send()
}))

// Leave group
router.post('/:id/leave', authenticate, withErrorHandling(async (req, res) => {
    const groupId = req.params.id
    const group = await dbGroup.getGroupById(groupId)
    if (!group) {
        throw new Error('NOT_FOUND')
    }

    await dbGroup.removeMemberFromGroup(group, req.user._id)

    return res.status(204).send()
}))

// Kick member from group
router.delete('/:id/kick', authenticate, withErrorHandling(async (req, res) => {
    const groupId = req.params.id
    const callerId = req.user._id
    const { memberId } = parseRequestBody(KickMemberRequest, req.body)
    const group = await dbGroup.getGroupById(groupId)
    if (!group) {
        throw new Error('NOT_FOUND')
    }

    if (!callerId.equals(group.createdBy)) {
        throw new Error('FORBIDDEN')
    }

    const member = await dbUser.getUserByID(memberId)

    await dbGroup.removeMemberFromGroup(group, member._id)

    return res.status(204).send()
}))

export default router