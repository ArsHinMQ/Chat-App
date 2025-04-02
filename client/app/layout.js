import "./globals.css"
import LanguageProvider from "@/app/provider/language-provider/index"

export const metadata = {
  title: "Loop Chat App",
  description: "A fun chat app made as my university final project",
}

export default function RootLayout({ children }) {

  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
}
