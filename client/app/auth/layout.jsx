import LanguageSwitcher from "../components/language-switcher"

export default function RootLayout({ children }) {
    return (
        <div className="flex w-full items-center justify-center min-h-screen bg-primaryDark">
            <div className="w-full max-w-md px-2">
                <div className="flex justify-center mb-5">
                    <LanguageSwitcher />
                </div>
                <div className="text-4xl font-bold text-center mb-2 text-secondary">Loop Chat App</div>
                {children}
            </div>
        </div>
    )
}
