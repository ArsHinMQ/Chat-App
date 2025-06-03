'use client'
import request from "@/app/request"
import { useLanguage } from "@/app/provider/language-provider"
import { useState } from "react"

export default function OTPSignupVerifyOTP({ email, goNextStep, setError, setRegisterToken }) {
    const [otp, setOTP] = useState('')

    const { translations } = useLanguage()
    const { signup: signupTranslations } = translations.auth

    const verifyOTP = async (event) => {
        // TODO: Backend logic
        event.preventDefault()
        setError('')
        const res = await request({
            route: '/auth/signup/verify',
            method: 'POST',
            body: { email, otp },
        })
        if (res.success && res.data.registerToken) {
            setRegisterToken(res.data.registerToken)
            goNextStep()
        } else {
            setError(res.error?.message ?? 'An error occurred')
        }
    }

    return (
        <form onSubmit={verifyOTP}>
            <p className='mb-5 mt-2'>{signupTranslations.otpCodeText.replace('{EMAIL}', email)}</p>
            <input
                type="text"
                required
                placeholder={signupTranslations.otpCodeInputPlaceholder}
                className="w-full p-2 rounded-md mb-3 bg-primaryDark outline-0"
                value={otp}
                onChange={e => setOTP(e.target.value)}
            />
            <button
                className="w-full bg-primaryLight border text-white py-2 rounded-md hover:bg-white hover:text-primaryLight transition"
            >
                {signupTranslations.verifyBtn}
            </button>
        </form>
    )
}