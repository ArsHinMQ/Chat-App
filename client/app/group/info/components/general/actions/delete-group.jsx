'use client'
import { useLanguage } from '@/app/provider/language-provider';
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirmDelete }) => {
    const { translations } = useLanguage()
    return (
        <>
            <div onClick={() => onClose()} className={`bg-black bg-opacity-50 top-0 left-0 fixed w-full h-full ${!isOpen ? 'hidden' : ''}`}></div>
            <div className={`fixed inset-0 flex items-center justify-center z-50 transition ${!isOpen ? '-translate-y-full' : 'translate-y-0'}`}>
                <div className="bg-primary rounded-lg shadow-lg w-96 h-[175px]">
                    <div className="px-5 pt-5">
                        <h2 className="text-xl mb-4 font-semibold text-fontLight">{translations.group.info.deleteGroupModalTitle}</h2>
                        <div className="mt-2 text-sm text-fontLight" dangerouslySetInnerHTML={{ __html: translations.group.info.deleteGroupModalText }} />
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 pb-3 pe-3 flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            {translations.group.info.deleteGroupModalCancelBtn}
                        </button>
                        <button
                            onClick={onConfirmDelete}
                            className="px-4 py-2 text-white bg-red-400 rounded hover:bg-red-500 transition"
                        >
                            {translations.group.info.deleteGroupModalConfirmBtn}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default function GroupInfoGeneralActionsDeleteGroup({ groupId }) {
    const { translations } = useLanguage()
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <>
            <button onClick={() => setModalOpen(true)} className="border flex justify-center item-center border-red-400 text-red-400 hover:bg-red-400 hover:text-primary transition rounded-lg py-4 px-5 flex items-center gap-2">
                <DeleteIcon className="p-0 m-0 md:me-2" />
                <span className="hidden md:block">
                    {translations.group.info.deleteGroupBtn}
                </span>
            </button>
            <DeleteModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirmDelete={() => setModalOpen(false)}
            />
        </>
    )
}