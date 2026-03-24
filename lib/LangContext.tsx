'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang } from './translations'

const LangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
}>({ lang: 'ru', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru')

  // При загрузке читаем сохранённый язык из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'ru' || saved === 'kz') {
      setLangState(saved)
    }
  }, [])

  // При смене языка сохраняем в localStorage
  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
