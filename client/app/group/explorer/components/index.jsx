"use client"
import { useState } from "react"
import GroupExplorerGroupDetails from "./group-details"
import GroupExplorerCategories from "./categories"
import GroupExplorerListGroups from "./list-groups"
import GroupExplorerSearchGroup from "./search-group"

export default function GroupExplorer({ inputCategories }) {
    const categories = inputCategories || []

    const [focusedGroup, setFocusedGroup] = useState(null)
    const [showGroupDeatils, setShowGroupDetils] = useState(false)

    const [selectedCategories, setSelectedCategories] = useState([])

    return (
        <div className="flex justify-center items-center h-full overflow-x-hidden">
            <div className="max-w-[1020px] w-full p-5 overflow-x-hidden">
                <GroupExplorerSearchGroup />
                <GroupExplorerCategories categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                <GroupExplorerListGroups setFocusedGroup={setFocusedGroup} setShowGroupDetils={setShowGroupDetils} categories={categories} selectedCategories={selectedCategories} />
            </div>
            <GroupExplorerGroupDetails focusedGroup={focusedGroup} setShowGroupDetils={setShowGroupDetils} showGroupDetails={showGroupDeatils} />
        </div>
    )
}