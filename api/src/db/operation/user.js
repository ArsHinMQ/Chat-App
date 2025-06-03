import User from "#src/db/model/user.js"

const doesUserExist = async (email) => {
    try {
        return await User.exists({ email: email })
    } catch (error) {
        console.error('Error checking user existence:', error)
        throw error
    }
}

const createUser = async (username, email, hashedPassword) => {
    try {
        const user = new User({
            username: username,
            email: email,
            hashedPassword: hashedPassword,
        })
        await user.save()
        return user
    } catch (error) {
        console.error('Error creating user:', error)
        throw error
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email })
        return user
    } catch (error) {
        console.error('Error getting user by email:', error)
        throw error
    }
}

const getUserByID = async (id) => {
    try {
        const user = User.findOne({ id: id })
        return user
    }
    catch (error) {
        console.error('Error getting user by ID:', error)
        throw error
    }
}

const getUsersById = async (ids, pager) => {
    try {
        const users = await User.find({ _id: { $in: ids } }).sort({ createdAt: -1 }).limit(pager.limit).skip(pager.offset)
        const totalUsers = await User.countDocuments({ id: { $in: ids } })
        return {
            users: users,
            totalUsers: totalUsers,
        }
    } catch (error) {
        console.error('Error getting users by ID:', error)
        throw error
    }
}

const updateUser = async (user, username, thumbnailURI, bio) => {
    try {
        user.username = username
        user.thumbnailURI = thumbnailURI
        user.bio = bio
        await user.save()
        return user
    } catch (error) {
        console.error('Error updating user:', error)
        throw error
    }
}

const deleteUser = async (id) => {
    try {
        const res = await User.updateOne({ id: id }, { isDeleted: true, email: null, hashedPassword: null, username: 'Deleted User', thumbnailURI: null, bio: null })
        return res.deletedCount > 0
    } catch (error) {
        console.error('Error deleting user:', error)
        throw error
    }
}

export { doesUserExist, createUser, getUserByEmail, getUserByID, getUsersById, updateUser, deleteUser }