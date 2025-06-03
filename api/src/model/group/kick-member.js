import zod from 'zod'


const KickMemberRequest = zod.object({
    memberId: zod.string(),
})

export { KickMemberRequest }