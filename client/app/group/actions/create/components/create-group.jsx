'use client'

import { useState } from "react"
import GroupAction from "../../components"
import { useLanguage } from "@/app/provider/language-provider"
import { useRouter } from "next/navigation"
import request from "@/app/request"


export default function CreateGroup() {
    const [groupName, setGroupName] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([])
    const [thumbnail, setThumbnail] = useState('')
    const [groupDescription, setGroupDescription] = useState('')

    const { translations } = useLanguage()

    const router = useRouter()

    const handleSubmit = async () => {
        const res = await request({
            route: '/group',
            method: 'POST',
            body: {
                name: groupName,
                description: groupDescription,
                categories: selectedCategories.map((category) => category.value),
                thumbnail: thumbnail,
            },
            isFormData: true
        })

        if (!res.success) {
            throw new Error('Failed to create group')
        }

        router.push(`/group/info/${res.data.id}`)
    }

    return <GroupAction handleSubmit={handleSubmit} translations={translations.group.creation} title={'Create New Group'} groupDescription={groupDescription} setGroupDescription={setGroupDescription} thumbnail={thumbnail} setThumbnail={setThumbnail} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} groupName={groupName} setGroupName={setGroupName} />
}