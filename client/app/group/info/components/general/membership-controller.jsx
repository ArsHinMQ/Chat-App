import request from "@/app/request"
import { useLanguage } from "@/app/provider/language-provider"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function GroupInfoMembershipController({ group, refresh }) {

    const { translations } = useLanguage()

    const router = useRouter()

    const [loading, setLoading] = useState(false) 

    const joinGroup = async () => {
        setLoading(true)
        const res = await request({
            route: `/group/${group.id}/join`,
            method: 'POST',
            withAuth: true
        })

        if (!res.success) {
            throw new Error('Failed to join group')
        }

        router.push(`/chat/${group.id}`)
    }

    const leaveGroup = async () => {
        setLoading(true)
        const res = await request({
            route: `/group/${group.id}/leave`,
            method: 'POST',
            withAuth: true
        })

        if (!res.success) {
            throw new Error('Failed to leave group')
        }

        refresh()
        setLoading(false)
    }


    return (
        <>
            {!group.amIJoined ? (
                <div className="mt-5">
                    <button onClick={joinGroup} disabled={loading} className="border-2 border-primaryLight hover:bg-primaryLight transition-colors text-fontLight py-3 font-bold px-4 rounded-lg w-full mt-4"  >
                        {translations.group.info.joinGroupBtn}
                    </button>
                </div>
            ) : (
                <div className="mt-5">
                    <button onClick={leaveGroup} disabled={loading} className="text-red-400 border-2 border-red-400 hover:text-white hover:bg-red-400 transition-colors text-fontLight py-3 font-bold px-4 rounded-lg w-full mt-4"  >
                        {translations.group.info.leaveGroupBtn}
                    </button>
                </div>
            )}
        </>
    )
}