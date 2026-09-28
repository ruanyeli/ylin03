import { useEffect, useState } from 'react'

const key = 'iquest.lang'
const initialLanguage = () => {
  try {
    const query = new URLSearchParams(window.location.search).get('lang')
    if (query === 'zh' || query === 'en') return query
    const saved = localStorage.getItem(key)
    if (saved === 'zh' || saved === 'en') return saved
  } catch { /* browser storage is optional */ }
  return navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function useLanguage() {
  const [language, setLanguage] = useState(initialLanguage)
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    try { localStorage.setItem(key, language) } catch { /* ignore */ }
  }, [language])
  return [language, () => setLanguage(value => value === 'zh' ? 'en' : 'zh')]
}
