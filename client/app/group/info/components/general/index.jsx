'use client'
import GroupInfoGeneralTitle from "./title"
import GroupInfoGeneralCategories from "./categories"
import GroupInfoGeneralDescription from "./description"
import GroupInfoActions from "@/app/group/info/components/general/actions/index"
import { useLanguage } from "@/app/provider/language-provider"

export default function GroupInfoGeneral({ group }) {
    const { translations } = useLanguage()
    return (
        <div className="p-3 h-full">
            <div className="mb-5 mt-2 px-2">
                <GroupInfoActions groupId={group.id} />
            </div>
            <div className="rounded-xl p-5 bg-primary">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-2/3">
                        <GroupInfoGeneralTitle groupName={group.name} groupThumbnail={group.thumbnail} numberOfMembers={group.numberOfMembers} />
                    </div>
                    <div className="w-full md:w-1/3">
                        <GroupInfoGeneralCategories categories={group.categories} />
                    </div>
                </div>
                <div className="mt-5">
                    <GroupInfoGeneralDescription description={group.description} />
                </div>
            </div>
            <div className="mt-5">
                    <button className="border-2 border-primaryLight hover:bg-primaryLight transition-colors text-fontLight py-3 font-bold px-4 rounded-lg w-full mt-4"  >
                        {translations.group.info.joinGroupBtn}
                    </button>
                </div>
        </div>
    )
}