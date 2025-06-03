import { withErrorHandling } from '#src/error/error-handler.js'
import authenticate from '#src/middleware/authenticate.js'
import * as dbCategory from '#src/db/operation/category.js'
import express from 'express'
import { ListCategoriesResponse } from '#src/model/category/list-categories.js'


const router = express.Router()

router.get('/', authenticate, withErrorHandling(async (req, res) => {
    const categories = await dbCategory.listCategories()
    return res.status(200).json(categories.map(cat => ListCategoriesResponse.parse(cat)))
}))

export default router