import zod from 'zod'


const PagerResponse = zod.object({
    page: zod.number().min(0),
    limit: zod.number().min(0),
    totalPages: zod.number().min(0),
})

export { PagerResponse }