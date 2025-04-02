'use client'

import { useState } from "react"
import GroupAction from "../../components"
import { useLanguage } from "@/app/provider/language-provider"


export default function CreateGroup() {
    const [groupName, setGroupName] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([])
    const [thumbnail, setThumbnail] = useState('')
    const [groupDescription, setGroupDescription] = useState('')

    const { translations } = useLanguage()

    return <GroupAction translations={translations.group.creation} title={'Create New Group'} groupDescription={groupDescription} setGroupDescription={setGroupDescription} thumbnail={thumbnail} setThumbnail={setThumbnail} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} groupName={groupName} setGroupName={setGroupName} />
}