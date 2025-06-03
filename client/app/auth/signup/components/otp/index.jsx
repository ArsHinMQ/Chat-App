'use client'

import Link from "next/link"
import { useState } from "react"
import OTPSignupSendEmail from "./send-email"
import OTPSignupVerifyOTP from "./verify-otp"
import OTPSignupRegisterUser from "./register-user"
import { useLanguage } from "@/app/provider/language-provider"

export default function OTPSignup() {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [registerToken, setRegisterToken] = useState('')
    const [signupStep, setSignupStep] = useState('email')

    const { translations } = useLanguage()
    const { signup: signupTranslations } = translations.auth

    return (
        <div className="w-full max-w-md bg-primaryLight px-4 py-6 md:p-6 rounded-lg shadow-lg">
            <div className="text-2xl font-semibold">{signupTranslations.pageTitle}</div>
            {
                signupStep === 'email' && (
                    <OTPSignupSendEmail
                        email={email}
                        setEmail={setEmail}
                        goNextStep={() => setSignupStep('verify')}
                        setError={setError}
                    />
                )
            }
            {
                signupStep === 'verify' && (
                    <OTPSignupVerifyOTP
                        email={email}
                        setRegisterToken={setRegisterToken}
                        goNextStep={() => setSignupStep('register')}
                        setError={setError}
                    />
                )
            }
            {
                signupStep === 'register' && (
                    <OTPSignupRegisterUser
                        email={email}
                        registerToken={registerToken}
                        setError={setError}
                    />
                )
            }

            <Link href={'/auth/login'} className="text-center block mt-3 text-secondary hover:underline">
                <span>{translations.auth.alreadyHaveAccountBtn}</span>
            </Link>

            <p className="text-center mt-3 text-red-400">{error}</p>
        </div>
    )
}