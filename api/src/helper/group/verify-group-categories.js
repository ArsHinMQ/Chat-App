import * as dbCategory from '#src/db/operation/category.js'


export default async function verifyGroupCategories(categories) {
    if (categories.length < 1 || categories.length > 3) {
        throw new Error('INVALID_BODY')
    }

    const validCategories = await dbCategory.getCategories(categories)
    if (validCategories.length !== categories.length) {
        throw new Error('INVALID_BODY')
    }
}