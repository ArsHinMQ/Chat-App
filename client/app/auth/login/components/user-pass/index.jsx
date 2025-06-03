'use client'

import request from '@/app/request'
import { useLanguage } from '@/app/provider/language-provider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UserPassLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { translations } = useLanguage()
    const { login: loginTranslations } = translations.auth

    const router = useRouter()

    const submitLogin = async () => {
        const res = await request({
            route: '/auth/login',
            method: 'POST',
            body: { email, password },
        })
        if (res.success) {
            router.push('/chat')
        } else {
            setError(res.error.message)
        }
    }

    return (
        <div className="w-full max-w-md bg-primaryLight px-4 py-6 md:p-6 rounded-lg shadow-lg">
            <div className="text-2xl font-semibold mb-1">{loginTranslations.pageTitle}</div>
            <p className='mb-5'>{loginTranslations.pageText}</p>
            <input
                type="email"
                placeholder={loginTranslations.emailInputPlaceholder}
                className="w-full p-2 rounded-md mb-3 bg-primaryDark outline-0"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder={loginTranslations.passwordInputPlaceholder}
                className="w-full p-2 rounded-md mb-3 bg-primaryDark outline-0"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button
                className="w-full bg-primaryLight border text-white py-2 rounded-md hover:bg-white hover:text-primaryLight transition"
                onClick={submitLogin}
            >
                {loginTranslations.loginBtn}
            </button>

            <Link href={'/auth/signup'} className="text-center block mt-3 text-secondary hover:underline">
                <span>{translations.auth.noAccountBtn}</span>
            </Link>

            <Link href={'/auth/forgot-password'} className="text-center block mt-3 text-primaryDark hover:underline">
                <span>{translations.auth.forgotPasswordBtn}</span>
            </Link>

            <p className="text-center mt-3 text-red-400">{error}</p>
        </div>
    )
}