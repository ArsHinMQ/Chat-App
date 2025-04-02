'use client'
import { useState } from 'react'
import GroupInfoMemberBox from './member-box'
import GroupInfoRemoveMemberModal from './remove-member-modal'
import { useLanguage } from '@/app/provider/language-provider'

export default function GroupInfoMembers({ members }) {
    const [selectedMember, setSelectedMember] = useState(null)
    const { translations } = useLanguage()
    return (
        <div className="px-2 max-h-screen overflow-auto">
            <div className="bg-primaryLight sticky top-0 px-5 py-3 mb-4 rounded-b-xl shadow-md">
                <div className="text-xl">{translations.group.info.membersSectionTitle}</div>
            </div>
            <div className="flex flex-col gap-4">
                {
                    members.map((member) => (
                        <GroupInfoMemberBox key={member.id} member={member} onRemove={() => setSelectedMember(member)} />
                    ))
                }
            </div>
            <GroupInfoRemoveMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} onConfirmRemove={() => setSelectedMember(null)}/>
        </div>
    )
}