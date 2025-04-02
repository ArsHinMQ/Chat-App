import Link from "next/link"

const ACTIVE_GROUP = 4

export default function ChatSidebarSingleChat({ groupId, groupName, lastMessage, singleGroupChatClick }) {
    const firstLetter = groupName.charAt(0).toUpperCase()

    console.log(groupId == ACTIVE_GROUP ? 'bg-primary' : '')

    return (
        <Link href={`/chat/${groupId}`}>
            <div onClick={singleGroupChatClick} className={`p-3 rounded-xl mb-2 cursor-pointer  ${groupId == ACTIVE_GROUP ? 'bg-backgroundDark hover:bg-backgroundDark' : 'bg-primary hover:bg-primaryLight'}`}>
                <div className='flex items-center'>
                    <div className={`bg-${firstLetter} min-w-[52px] min-h-[52px] rounded-full`}></div>
                    <div className="ms-3 w-[calc(100%-52px-10px)]">
                        <div className="text-lg">{groupName}</div>
                        <div className="text-gray-400 text-xs text-ellipsis truncate w-full">{lastMessage}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}