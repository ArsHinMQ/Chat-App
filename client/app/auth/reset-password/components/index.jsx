'use client'

import passwordStrengthCheck from '@/app/helper/password-strength-check'
import { useLanguage } from '@/app/provider/language-provider'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ResetPassword() {
    const { translations } = useLanguage()
    const { resetPassword: resetPasswordTranslations } = translations.auth

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const resetPassword = () => {
        setError('')
        if (!passwordStrengthCheck(newPassword)) {
            setError(resetPasswordTranslations.weakPasswordError)
            return
        }
        if (newPassword !== confirmNewPassword) {
            setError(resetPasswordTranslations.passwordsDoNotMatchError)
            return
        }
        // LOGIC
        router.push('/auth/login')
    }

    return (
        <form action={resetPassword} method='post' className="w-full max-w-md bg-primaryLight px-4 py-6 md:p-6 rounded-lg shadow-lg">
            <div className="text-2xl font-semibold">{resetPasswordTranslations.pageTitle}</div>
            <p className='mb-5'>{resetPasswordTranslations.pageText}</p>
            <input
                type="password"
                placeholder={resetPasswordTranslations.passwordInputPlaceholder}
                className="w-full p-2 rounded-md mb-3 bg-primaryDark outline-0"
                value={newPassword}
                required
                minLength={8}
                onChange={e => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder={resetPasswordTranslations.confirmPasswordInputPlaceholder}
                className="w-full p-2 rounded-md mb-3 bg-primaryDark outline-0"
                required
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
            />
            <button
                className="w-full bg-primaryLight border text-white py-2 rounded-md hover:bg-white hover:text-primaryLight transition"
            >
                {resetPasswordTranslations.resetPasswordBtn}
            </button>

            <p className="text-center mt-3 text-red-400">{error}</p>
        </form>
    )
}