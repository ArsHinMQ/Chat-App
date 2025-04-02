'use client'
import { useLanguage } from "@/app/provider/language-provider"

export default function OTPSignupSendEmail({ email, setEmail, goNextStep, setError }) {
    const { translations } = useLanguage()
    const { signup: signupTranslations } = translations.auth

    const submitEmail = async (event) => {
        // TODO: Backend logic
        event.preventDefault()
        setError('')
        goNextStep()
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