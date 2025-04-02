'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import en from '@/app/locales/en.json'
import fa from '@/app/locales/fa.json'
import Cookies from 'js-cookie'

const translations = { en, fa }

const LanguageContext = createContext()

export default function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    const storedLocale = Cookies.get('locale')
    if (storedLocale) {
      setLocale(storedLocale)
    }
  }, [])

  const changeLanguage = (lang) => {
    setLocale(lang)
    Cookies.set('locale', lang, { expires: 365, path: '/', sameSite: 'None', secure: true })
  }

  return (
    <LanguageContext.Provider value={{ locale, translations: translations[locale], changeLanguage, direction: locale === 'fa' ? 'rtl' : 'ltr' }}>
      <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
        <body className={`overflow-hidden ${locale === 'fa' ? 'rtl' : 'ltr'}`}>
          {children}
        </body>
      </html>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}