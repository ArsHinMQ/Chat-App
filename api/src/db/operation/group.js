import Group from "#src/db/model/group.js"

const createGroup = async (name, thumbnailURI, description, categories, creatorId, type) => {
    try {
        const group = new Group({
            name,
            thumbnailURI,
            description,
            categoryKeys: categories,
            members: [{ userId: creatorId, role: 'admin' }],
            createdBy: creatorId,
            type: type,
        })

        await group.save()
        return group
    } catch (error) {
        console.error('Error creating group:', error)
        throw error
    }
}

const getGroupById = async (groupId) => {
    try {
        const group = await Group.findOne({ id: groupId })
        return group
    } catch (error) {
        console.error('Error getting group by ID:', error)
        throw error
    }
}

const updateGroup = async (group, newName, newThumbnailURI, newDescription, newCategories) => {
    try {
        group.name = newName
        group.thumbnailURI = newThumbnailURI
        group.description = newDescription
        group.categoryKeys = newCategories

        await group.save()
        return group
    } catch (error) {
        console.error('Error updating group:', error)
        throw error
    }
}

const deleteGroup = async (groupId) => {
    try {
        await Group.deleteOne({ id: groupId })
    } catch (error) {
        console.error('Error deleting group:', error)
        throw error
    }
}

const addMemberToGroup = async (group, userId, role) => {
    try {
        group.members.push({ userId, role })
        await group.save()
    } catch (error) {
        console.error('Error adding member to group:', error)
        throw error
    }
}

const removeMemberFromGroup = async (group, memberId) => {
    try {
        group.members = group.members.filter(member => !member.userId.equals(memberId))
        await group.save()
    } catch (error) {
        console.error('Error removing member from group:', error)
        throw error
    }
}

const searchGroups = async (categories, pager) => {
    try {
        const query = categories.length > 0 ? { categoryKeys: { $in: categories } } : {}
        const groups = await Group.find(query)
            .skip(pager.offset)
            .limit(pager.limit)
            .exec()
        const totalGroups = await Group.countDocuments(query).exec()

        // Add member count and isMember flag to each group
        const groupsWithMemberCount = groups.map(group => ({
            ...group.toObject(),
            members: group.members.length
        }))


        return {
            groups: groupsWithMemberCount,
            totalGroups: totalGroups,
        }
    } catch (error) {
        console.error('Error searching groups:', error)
        throw error
    }
}

const getGroupsWithUsersInThem = async (userIds) => {
    try {
        const groups = await Group.find({ members: { $all: userIds.map(userId => ({ $elemMatch: { userId: userId } })) } })
        return groups
    } catch (error) {
        console.error('Error getting groups with users in them:', error)
        throw error
    }
}

const getMyGroups = async (userId, pager) => {
    try {
        const groups = await Group.find({ 'members.userId': userId })
            .skip(pager.offset)
            .limit(pager.limit)
            .exec()
        const totalGroups = await Group.countDocuments({ 'members.userId': userId }).exec()

        return {
            groups,
            totalGroups,
        }
    } catch (error) {
        console.error('Error getting user groups:', error)
        throw error
    }
}

export { createGroup, getGroupById, updateGroup, deleteGroup, addMemberToGroup, removeMemberFromGroup, searchGroups, getGroupsWithUsersInThem, getMyGroups }