import zod from 'zod'

const ListCategoriesResponse = zod.object({
    key: zod.string(),
    name: zod.string(),
})

export { ListCategoriesResponse }