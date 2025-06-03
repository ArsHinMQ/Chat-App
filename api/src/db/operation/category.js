import Category from "#src/db/model/category.js"

const getCategories = async (categoryKeys) => {
    try {
        return Category.find({ key: { $in: categoryKeys } })
    } catch (error) {
        console.error('Error checking user existence:', error)
        throw error
    }
}


const listCategories = async () => {
    try {
        return Category.find({})
    } catch (error) {
        console.error('Error checking user existence:', error)
        throw error
    }
}

const getCategoriesByKeys = async (categoryKeys) => {
    try {
        return Category.find({ key: { $in: categoryKeys } })
    } catch (error) {
        console.error('Error checking user existence:', error)
        throw error
    }
}

export { getCategories, listCategories, getCategoriesByKeys }