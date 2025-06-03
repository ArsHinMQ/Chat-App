'use client'
import request from "@/app/request"
import { useLanguage } from "@/app/provider/language-provider"

export default function OTPSignupSendEmail({ email, setEmail, goNextStep, setError }) {
    const { translations } = useLanguage()
    const { signup: signupTranslations } = translations.auth

    const submitEmail = async (event) => {
        event.preventDefault()
        setError('')
        const res = await request({
            route: '/auth/signup/email',
            method: 'POST',
            body: { email },
            withAuth: false
        })
        if (res.success) {
            goNextStep()
        } else {
            setError(res.error.message)
        }
    }
    

    return (
        <form onSubmit={submitEmail}>
            <p className='mb-5'>{signupTranslations.enterEmailText}</p>
            <input
                type="email"
                required
                placeholder={signupTranslations.emailInputPlaceholder}
                className="w-full p-2 rounded-md mb-3 bg-primaryDark outline-0"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button
                className="w-full bg-primaryLight border text-white py-2 rounded-md hover:bg-white hover:text-primaryLight transition"
            >
                {signupTranslations.submitEmailBtn}
            </button>
        </form>
    )
}