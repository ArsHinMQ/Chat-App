'use client'
import findFirstLetter from "@/app/helper/find-first-letter"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import Link from "next/link"
import { useLanguage } from "@/app/provider/language-provider"
import getFilePath from "@/app/helper/get-file-path"

export default function GroupInfoMemberBox({ myRole, member, onRemove }) {
    const { direction } = useLanguage()
    return (
        <div className="flex relative items-center bg-primary p-3 rounded-lg overflow-hidden hover:cursor-pointer group">
            <div style={{ backgroundImage: `url(${getFilePath(member.thumbnailURI)})` }} className={`bg-${findFirstLetter(member.username)} min-w-[48px] min-h-[48px] rounded-full bg-cover bg-center`}></div>
            <div className="ms-3 text-sm">{member.username}</div>
            {myRole === 'admin' && (
                <button onClick={() => onRemove()} className={`border border-primary absolute ${direction === 'ltr' ? 'right-0 translate-x-[200px] group-hover:translate-x-[-50px]' : 'left-0 -translate-x-[200px] group-hover:translate-x-[50px]'} group-hover:translate-x-0 transition top-1/2 w-[50px] -translate-y-1/2 bg-red-400 hover:bg-red-500 transition h-full py-4`}>
                    <PersonRemoveIcon />
                </button>
            )}
            <button className={`border border-primary absolute ${direction === 'ltr' ? 'right-0 translate-x-[200px]' : 'left-0 -translate-x-[200px]'} group-hover:translate-x-0 transition top-1/2 w-[50px] -translate-y-1/2 bg-blue-400 hover:bg-blue-500 transition h-full py-4`}>
                <Link href={`/user/${member.id}`}>
                    <InfoIcon />
                </Link>
            </button>
        </div>
    )
}