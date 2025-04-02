'use client'

import { useLanguage } from '@/app/provider/language-provider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UserPassLogin() {

    const { translations } = useLanguage()
    const { forgotPassword: forgotPasswordTranslations } = translations.auth

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const sendResetPasswordEmail = () => {
        router.push('/auth/login')
    }

    return (
        <div className="w-full max-w-md bg-primaryLight px-4 py-6 md:p-6 rounded-lg shadow-lg">
            <div className="text-2xl font-semibold mb-1">{forgotPasswordTranslations.pageTitle}</div>
            <p className='mb-5'>{forgotPasswordTranslations.pageText}</p>
            <input
                type="text"
                placeholder={forgotPasswordTranslations.emailInputPlaceholder}
                className="w-full p-2 rounded-md mb-3 bg-primaryDark outline-0"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button
                className="w-full bg-primaryLight border text-white py-2 rounded-md hover:bg-white hover:text-primaryLight transition"
                onClick={sendResetPasswordEmail}
            >
                {forgotPasswordTranslations.sendEmailBtn}
            </button>

            <Link href={'/auth/signup'} className="text-center block mt-3 text-secondary hover:underline">
                <span>{translations.auth.noAccountBtn}</span>
            </Link>

            <p className="text-center mt-3 text-red-400">{error}</p>
        </div>
    )
}