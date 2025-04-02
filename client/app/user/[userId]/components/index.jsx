'use client'
import findFirstLetter from "@/app/helper/find-first-letter"
import Link from "next/link"
import MessageIcon from '@mui/icons-material/Message'
import { useLanguage } from "@/app/provider/language-provider"


export default function UserProfile({ user }) {
    const firstLetter = findFirstLetter(user.username)
    const { translations } = useLanguage()
    return (
        <div className="flex gap-3 flex-col justify-center md:flex-row h-screen py-7">
            <div className="w-full md:w-2/5 px-5 flex flex-col items-end">
                <div className="flex flex-col items-center p-5 rounded-lg justify-center w-full">
                    <div className="mb-5">
                        <div style={{ backgroundImage: `url(${user.thumbnail})` }} className={`bg-${firstLetter} border border-4 border-${firstLetter} w-[172px] h-[172px] rounded-full bg-cover bg-center ring ring-primary`}></div>
                    </div>
                    <div className={`text-3xl bg-${firstLetter} font-semibold py-2 rounded px-8`}>{user.username}</div>
                </div>
                <div className="mt-5 w-full border-t pt-5 border-t-primaryLight">
                    <div className="text-xl font-semibold mb-1">{translations.user.profile.bioTitle}</div>
                    <div className="text-sm bg-primaryLight py-2 rounded px-8">{user.bio}</div>
                </div>
                <div className="mt-5 w-full border-t pt-5 border-t-primaryLight">
                    <Link href={`/chat/${user.id}`} className={`border flex justify-center items-center border-secondary text-secondary hover:bg-secondary hover:text-primary transition rounded-lg py-4 px-5 flex items-center gap-2`}>
                        <MessageIcon className="p-0 m-0 md:me-2" />
                        <span className="hidden md:block">
                            {translations.user.profile.chatWithUserBtn.replace('{USERNAME}', user.username)}
                        </span>
                    </Link>
                </div>
            </div>
            <div className="w-full md:w-2/5 px-5 md:px-8 border-s border-s-primaryLight">
                <div className="flex flex-col items-center p-5 rounded-lg w-full max-h-full">
                    <div className={`mb-5 bg-${firstLetter} w-full py-3 text-center rounded-lg`}>
                        <div className="text-xl font-semibold">{translations.user.profile.sharedGroupsTitle}</div>
                    </div>
                    <div className="flex flex-col gap-2 w-full h-full overflow-auto hidden-scrollbar">
                        {
                            user.sharedGroups.map((group) => (
                                <Link href={`/group/info/${group.id}`} key={group.id} className="w-full">
                                    <div key={group.id} className="flex w-full relative items-center bg-primaryLight p-3 rounded-lg overflow-hidden hover:cursor-pointer group">
                                        <div className={`bg-${findFirstLetter(group.name)} min-w-[48px] min-h-[48px] rounded-full`}></div>
                                        <div className="ms-3 text-md">{group.name}</div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}