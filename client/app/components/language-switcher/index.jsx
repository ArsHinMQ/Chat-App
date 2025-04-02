'use client'

import React, { useState, useEffect } from "react"
import LanguageIcon from '@mui/icons-material/Language'
import { useLanguage } from "@/app/provider/language-provider"

const LanguageSwitcher = () => {
  const {changeLanguage, locale} = useLanguage()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const onChangeLanguage = (lang) => {
    changeLanguage(lang)
    setDropdownOpen(false)
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        <LanguageIcon className="me-2" />
        {locale === "en" ? "English" : "فارسی"}
      </button>

      {dropdownOpen && (
        <div className="absolute mt-2 w-32 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <button
            onClick={() => onChangeLanguage("en")}
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
          >
            English 🇬🇧
          </button>
          <button
            onClick={() => onChangeLanguage("fa")}
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
          >
            فارسی 🇮🇷
          </button>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher