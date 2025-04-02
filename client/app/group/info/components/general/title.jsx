import findFirstLetter from "@/app/helper/find-first-letter";

export default function GroupInfoGeneralTitle({ groupName, groupThumbnail, numberOfMembers }) {
    return (
        <div className='flex h-full items-center bg-primaryLight p-5 rounded-xl'>
            <div style={{ backgroundImage: `url(${groupThumbnail})` }} className={`bg-${findFirstLetter(groupName)} min-w-[72px] min-h-[72px] rounded-full bg-cover bg-center`}></div>
            <div className="ms-3 w-[calc(100%-52px-10px)]">
                <div className="text-2xl">{groupName}</div>
                <div className="text-sm text-special ps-1 ">{numberOfMembers ?? 0} members</div>
            </div>
        </div>
    )
}