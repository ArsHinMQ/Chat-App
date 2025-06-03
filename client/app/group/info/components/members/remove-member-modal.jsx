'use client'

import Alert from "@/app/components/alert"
import request from "@/app/request"
import { useLanguage } from "@/app/provider/language-provider"
import { useState } from "react"


export default function GroupInfoRemoveMemberModal ({ groupId, member, onClose, refresh }) {
    const { translations } = useLanguage()

    const [alertOpen, setAlertOpen] = useState(false)

    const onConfirmRemove = async () => {
        const res = await request({
            route: `/group/${groupId}/kick`,
            method: 'DELETE',
            body: { memberId: member.id },
            withAuth: true
        })

        if (res.success) {
            onClose()
            setAlertOpen(true)
            refresh()
        }

        throw new Error('Failed to remove member')
    }

    return (
        <>
            <div onClick={() => onClose()} className={`bg-black bg-opacity-50 top-0 left-0 fixed w-full h-full ${!member ? 'hidden' : ''}`}></div>
            <div className={`fixed inset-0 flex items-center justify-center z-50 transition ${!member ? '-translate-y-full' : 'translate-y-0'}`}>
                <div className="bg-primary rounded-lg shadow-lg w-96 h-[200px]">
                    <div className="px-5 pt-5">
                        <h2 className="text-xl mb-4 font-semibold text-fontLight">{translations.group.info.removeMemberModalTitle}</h2>
                        <p className="mt-2 text-sm text-fontLight" dangerouslySetInnerHTML={{ __html: translations.group.info.removeMemberModalText.replace('{MEMBER_NAME}', member?.username ?? '' ) }} />
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 pb-3 pe-3 flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            {translations.group.info.removeMemberModalCancelBtn}
                        </button>
                        <button
                            onClick={onConfirmRemove}
                            className="px-4 py-2 text-white bg-red-400 rounded hover:bg-red-500 transition"
                        >
                            {translations.group.info.removeMemberModalConfirmBtn}
                        </button>
                    </div>
                </div>
            </div>
            <Alert
                visible={alertOpen}
                type="success"
                setVisible={setAlertOpen}
                message={translations.group.info.removeMemberSuccessAlertMessage}
            />
        </>
    )
}