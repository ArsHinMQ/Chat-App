'use client'
import Alert from "@/app/components/alert"
import { useLanguage } from "@/app/provider/language-provider"
import { useState } from "react"

export default function MyProfileChangePassword({ email }) {

    const { translations } = useLanguage()

    const [showAlert, setShowAlert] = useState(false)

    return (
        <>
            <button onClick={() => setShowAlert(true)} className="text-primaryLight underline transition-colors text-fontLight py-3 font-bold px-4 rounded-lg w-full mt-3">
                {translations.user.me.changePasswordBtn}
            </button>
            <Alert message={translations.user.me.changePasswordAlert.replace('{EMAIL}', email)} visible={showAlert} setVisible={setShowAlert} />
        </>
    )
}