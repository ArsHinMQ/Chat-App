'use client'

import { useState } from "react"
import GroupAction from "../../components"
import { useLanguage } from "@/app/provider/language-provider"
import getFilePath from "@/app/helper/get-file-path"
import request from "@/app/request"
import { useRouter } from "next/navigation"


export default function UpdateGroup({ currentGroupId, currentGroupName, currentGroupCategories, currentGroupThumbnail, currentGroupDescription }) {
    const [groupName, setGroupName] = useState(currentGroupName ?? '')
    const [selectedCategories, setSelectedCategories] = useState(currentGroupCategories.map((cat) => {
        return {
            label: cat.name,
            value: cat.key
        }
    }) ?? [])
    const [thumbnail, setThumbnail] = useState(getFilePath(currentGroupThumbnail) ?? '')
    const [groupDescription, setGroupDescription] = useState(currentGroupDescription ?? '')

    const {translations} = useLanguage()

    const router = useRouter()

    const handleSubmit = async () => {
        const res = await request({
            route: `/group/${currentGroupId}`,
            method: 'PUT',
            body: { name: groupName, description: groupDescription, categories: selectedCategories.map((cat) => cat.value), thumbnail: thumbnail },
            withAuth: true,
            isFormData: true,
        })

        if (!res.success) {
            throw new Error('Failed to update group')
        }
        
        router.push(`/group/info/${currentGroupId}`)
    }

    return <GroupAction translations={translations.group.update}  groupDescription={groupDescription} setGroupDescription={setGroupDescription} thumbnail={thumbnail} setThumbnail={setThumbnail} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} groupName={groupName} setGroupName={setGroupName} handleSubmit={handleSubmit} />
}