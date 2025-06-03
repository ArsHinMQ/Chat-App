'use client'
import GroupInfoGeneral from "./general"
import GroupInfoMembers from './members'
import { useEffect, useState } from "react"
import request from "@/app/request"

export default function GroupInfo({ groupId }) {

    const [group, setGroup] = useState(null)
    const [members, setMembers] = useState([])
    const [generalLoading, setGeneralLoading] = useState(true)
    const [membersLoading, setMembersLoading] = useState(true)

    const [refresh, setRefresh] = useState(false)
    const [membersRefresh, setMembersRefresh] = useState(false)

    async function getGroupInfo() {
        const res = await request({
            route: `/group/${groupId}`,
            method: 'GET',
            withAuth: true,
        })

        if (!res.success) {
            throw new Error('Failed to fetch categories')
        }

        setGroup(res.data)
        setGeneralLoading(false)
    }

    async function getGroupMembers() {
        setMembersLoading(true)
        const res = await request({
            route: `/group/${groupId}/members`,
            method: 'GET',
            withAuth: true,
        })

        if (!res.success) {
            throw new Error('Failed to fetch members')
        }

        setMembers(res.data.members)
        setMembersLoading(false)
    }

    useEffect(() => {
        getGroupInfo()
        getGroupMembers()
    }, [refresh])

    useEffect(() => {
        getGroupMembers()
    }, [membersRefresh])

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="w-full md:w-2/3">
                <GroupInfoGeneral group={group} loading={generalLoading} refresh={setRefresh} />
            </div>
            <div className="w-full md:w-1/3">
                <GroupInfoMembers myRole={group?.myRole} groupId={group?.id} members={members} loading={membersLoading || generalLoading} refresh={setMembersRefresh} />
            </div>
        </div>
    )
}