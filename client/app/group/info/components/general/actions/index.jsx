import Link from "next/link"
import MessageIcon from '@mui/icons-material/Message'
import EditIcon from '@mui/icons-material/Edit'
import GroupInfoGeneralActionsDeleteGroup from "./delete-group"
import { useLanguage } from "@/app/provider/language-provider"


export default function GroupInfoActions({ groupId, myRole }) {
    const { translations } = useLanguage()
    return (
        <div className="flex justify-between">
            <Link href={`/chat/${groupId}`} className="border flex justify-center items-center border-secondary text-secondary hover:bg-secondary hover:text-primary transition rounded-lg py-4 px-5 flex items-center gap-2">
                <MessageIcon className="p-0 m-0 md:me-2" />
                <span className="hidden md:block">
                    {translations.group.info.backToChatBtn}
                </span>
            </Link>
            {myRole === "admin" && (
                <Link href={`/group/actions/update/${groupId}`} className="border flex justify-center items-center border-special text-special hover:bg-special hover:text-primary transition rounded-lg py-4 px-5 flex items-center gap-2">
                    <EditIcon className="p-0 m-0 md:me-2" />
                    <span className="hidden md:block">
                    {translations.group.info.editGroupBtn}
                    </span>
                </Link>
            )}
            {myRole === "admin" && (
                <GroupInfoGeneralActionsDeleteGroup groupId={groupId} />
            )}
        </div>
    )
}