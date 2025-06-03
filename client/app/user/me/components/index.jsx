'use client'

import ThumbnailPicker from '@/app/components/thumbnail-picker/index'
import findFirstLetter from '@/app/helper/find-first-letter'
import { useState } from 'react'
import MyProfileChangePassword from './change-password'
import LanguageSwitcher from '@/app/components/language-switcher'
import { useLanguage } from '@/app/provider/language-provider'
import getFilePath from '@/app/helper/get-file-path'
import request from '@/app/request'
import { CircularProgress } from '@mui/material'
import Alert from '@/app/components/alert'
import Link from 'next/link'


export default function MyPorfile({ user }) {
    const [thumbnail, setThumbnail] = useState(user.thumbnail)
    const [bio, setBio] = useState(user.bio)
    const [username, setUsername] = useState(user.username)
    const [firstLetter, setFirstLetter] = useState(findFirstLetter(username))
    const [isSaving, setIsSaving] = useState(false)

    const [showAlert, setShowAlert] = useState(false)

    const { translations } = useLanguage()

    const onUsernameChange = (event) => {
        setUsername(event.target.value)
        setFirstLetter(findFirstLetter(event.target.value))
    }

    const onSaveChanges = async () => {
        setIsSaving(true)
        const res = await request({
            route: '/user',
            method: 'PUT',
            body: { username, bio, thumbnail },
            isFormData: true
        })

        if (!res.success) {
            setIsSaving(false)
            throw new Error('Failed to save changes')
        }

        setShowAlert(true)
        setIsSaving(false)
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-5">
            <LanguageSwitcher />
            <div className="flex flex-col justify-center items-center w-full max-w-lg mt-3">
                <div className='mb-5 w-full flex flex-col justify-center items-center'>
                    <div>
                        <ThumbnailPicker itemName={username} thumbnail={getFilePath(thumbnail)} setThumbnail={setThumbnail} width={200} height={200} />
                    </div>
                    <div className="mt-10 w-full">
                        <input value={username} onChange={onUsernameChange} className={`appearance-none bg-inherit border border-2 border-${firstLetter} focus:bg-primary px-4 py-3 rounded-lg w-full focus:outline-none text-fontLight text-xl transiton`} placeholder={translations.user.me.usernameInputPlaceholder} />
                    </div>
                </div>
                <div className="mt-5 w-full">
                    <div className='text-xl mb-3'>{translations.user.me.bioTitle}</div>
                    <textarea value={bio} onChange={(event) => setBio(event.target.value)} className="resize-none appearance-none bg-primaryLight px-4 py-3 rounded-lg w-full focus:outline-none text-fontLight text-md" rows={6} placeholder={translations.user.me.bioInputPlaceholder}></textarea>
                </div>
                <div className="mt-5 w-full">
                    <div className='text-xl mb-1'>{translations.user.me.idTitle}</div>
                    <span className='text-sm bg-primaryLight'>{translations.user.me.idText}</span>
                    <input
                        type="text"
                        placeholder="ID"
                        className="mt-4 w-full p-2 rounded-md mb-3 border border-primaryLight outline-0 bg-inherit"
                        disabled
                        value={user.id}
                    />
                </div>
                <div className="mt-5 w-full ">
                    <div className='text-xl mb-3'>{translations.user.me.emailTitle}</div>
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full p-2 rounded-md mb-3 border border-primaryLight outline-0 bg-inherit text-gray-500 text-md focus:bg-primaryLight"
                        disabled
                        value={user.email}
                    />
                </div>
                <div className="mt-4 w-full">
                    <button onClick={onSaveChanges} disabled={isSaving} className={`border border-secondary text-secondary hover:bg-secondary disabled:hover:bg-inherit hover:text-primary disabled:hover:text-secondary  transition-colors text-fontLight py-3 font-bold px-4 rounded-lg w-full mt-4 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isSaving ? <div className="flex items-center justify-center"><CircularProgress size={'1.2rem'} color='whites' /></div> : translations.user.me.saveChangesBtn}
                    </button>
                    <Alert message={translations.user.me.profileSavedAlert} type='success' visible={showAlert} setVisible={setShowAlert} />
                    <MyProfileChangePassword email={user.email} />
                </div>
            </div>
        </div>
    )
}