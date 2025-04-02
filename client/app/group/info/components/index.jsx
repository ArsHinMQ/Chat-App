import GroupInfoGeneral from "./general"
import GroupInfoMembers from './members'

export default function GroupInfo({ group }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="w-full md:w-2/3">
                <GroupInfoGeneral group={group} />
            </div>
            <div className="w-full md:w-1/3">
                <GroupInfoMembers members={group.members} />
            </div>
        </div>
    )
}