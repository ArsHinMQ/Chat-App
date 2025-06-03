import Link from "next/link"
import getFilePath from "@/app/helper/get-file-path"
import findFirstLetter from "@/app/helper/find-first-letter"

export default function ChatSidebarSingleChat({ activeGroupId, groupId, groupName, lastMessage, singleGroupChatClick, thumbnailURI }) {
    return (
        <Link href={`/chat/${groupId}`}>
            <div onClick={singleGroupChatClick} className={`p-3 rounded-xl mb-2 cursor-pointer  ${groupId == activeGroupId ? 'bg-backgroundDark hover:bg-backgroundDark' : 'bg-primary hover:bg-primaryLight'}`}>
                <div className='flex items-center'>
                    <div style={{ backgroundImage: `url(${getFilePath(thumbnailURI)})` }} className={`bg-${findFirstLetter(groupName)} min-w-[52px] min-h-[52px] rounded-full bg-cover bg-center`}></div>
                    <div className="ms-3 w-[calc(100%-52px-10px)]">
                        <div className="text-lg">{groupName}</div>
                        <div className="text-gray-400 text-xs text-ellipsis truncate w-full">{lastMessage}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}