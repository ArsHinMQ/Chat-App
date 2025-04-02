'use client'

import { useState } from "react"
import GroupAction from "../../components"
import { useLanguage } from "@/app/provider/language-provider"


export default function UpdateGroup({ currentGroupId, currentGroupName, currentGroupCategories, currentGroupThumbnail, currentGroupDescription }) {
    const [groupName, setGroupName] = useState(currentGroupName ?? '')
    const [selectedCategories, setSelectedCategories] = useState(currentGroupCategories.map((cat) => {
        return {
            label: cat.name,
            value: cat.id
        }
    }) ?? [])
    const [thumbnail, setThumbnail] = useState(currentGroupThumbnail ?? '')
    const [groupDescription, setGroupDescription] = useState(currentGroupDescription ?? '')

    const {translations} = useLanguage()

    return <GroupAction translations={translations.group.update}  groupDescription={groupDescription} setGroupDescription={setGroupDescription} thumbnail={thumbnail} setThumbnail={setThumbnail} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} groupName={groupName} setGroupName={setGroupName} />
}