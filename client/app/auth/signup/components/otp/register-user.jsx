'use client'
import passwordStrengthCheck from "@/app/helper/password-strength-check"
import { useLanguage } from "@/app/provider/language-provider"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function OTPSignupRegisterUser({ email, setError }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { translations } = useLanguage()
    const { signup: signupTranslations } = translations.auth

    const router = useRouter()


    const register = async (event) => {
        // TODO: Backend logic
        event.preventDefault()
        setError('')
        if (!passwordStrengthCheck(password)) {
            setError(signupTranslations.weakPasswordError)
            return
        }

        router.push('/auth/login')

    }

    return (
        <form onSubmit={register}>
            <p className='mb-5 mt-2'>{signupTranslations.registerText}</p>
            <input
                type="email"
                required
                placeholder="Email"
                disabled
                className="w-full p-2 rounded-md mb-3 bg-primaryDark outline-0 text-gray-300"
                value={email}
            />
            <input
                type="text"
                required
                placeholder={signupTranslations.usernameInputPlaceholder}
                className="w-full p-2 rounded-md mb-3 bg-primaryDark outline-0"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                required
                placeholder={signupTranslations.passwordInputPlaceholder}
                className="w-full p-2 rounded-md mb-3 bg-primaryDark outline-0"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button
                className="w-full bg-primaryLight border text-white py-2 rounded-md hover:bg-white hover:text-primaryLight transition"
            >
                {signupTranslations.registerBtn}
            </button>
        </form>
    )
}