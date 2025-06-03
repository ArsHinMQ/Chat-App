import Alert from "@/app/components/alert"
import request from "@/app/request"
import { useLanguage } from "@/app/provider/language-provider"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function GroupExplorerSearchGroup() {

    const [groupID, setGroupID] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)

    const { translations } = useLanguage()

    const router = useRouter()

    const handleVisitGroup = async () => {
        const res = await request({
            route: `/group/${groupID}`,
        })

        if (res.success) {
            router.push(`/group/info/${groupID}`)
            return
        }

        setGroupID('')
        setAlertOpen(true)
    }

    return (
        <div className="flex justify-center items-center">
            <input value={groupID} onChange={(event) => setGroupID(event.target.value)} className="appearance-none bg-primaryLight px-4 py-3 rounded-lg max-w-md w-full focus:outline-none text-fontLight" placeholder={translations.group.explorer.groupCodeInputPlaceholder} />
            <button onClick={handleVisitGroup} className="disabled:text-primary underline rounded py-2 px-4 ms-2 bg-primaryDark" disabled={groupID.length === 0}>{translations.group.explorer.joinGroupButtonShort}</button>
            <Alert
                visible={alertOpen}
                type="error"
                setVisible={setAlertOpen}
                message={translations.group.explorer.groupNotFoundAlertMessage}
            />
        </div>
    )
}