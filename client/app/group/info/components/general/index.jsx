'use client'
import GroupInfoGeneralTitle from "./title"
import GroupInfoGeneralCategories from "./categories"
import GroupInfoGeneralDescription from "./description"
import GroupInfoActions from "@/app/group/info/components/general/actions/index"
import getFilePath from "@/app/helper/get-file-path"
import GroupInfoMembershipController from "./membership-controller"
import { CircularProgress } from '@mui/material'


export default function GroupInfoGeneral({ group, loading, refresh }) {

    return (
        <div className="p-3 h-full">
            {(loading || !group) ? (
                <div className="flex justify-center items-center h-full">
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <div className="mb-5 mt-2 px-2">
                        <GroupInfoActions groupId={group.id} myRole={group.myRole} />
                    </div>
                    <div className="rounded-xl p-5 bg-primary">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-2/3">
                                <GroupInfoGeneralTitle groupName={group.name} groupThumbnail={getFilePath(group.thumbnailURI)} numberOfMembers={group.numberOfMembers} />
                            </div>
                            <div className="w-full md:w-1/3">
                                <GroupInfoGeneralCategories categories={group.categories} />
                            </div>
                        </div>
                        <div className="mt-5">
                            <GroupInfoGeneralDescription description={group.description} />
                        </div>
                    </div>
                    <GroupInfoMembershipController group={group} refresh={refresh} />
                </>
            )}
        </div>
    )
}