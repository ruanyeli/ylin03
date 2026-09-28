import '@fontsource-variable/newsreader/opsz.css'
import '@fontsource-variable/newsreader/opsz-italic.css'
import '@fontsource-variable/source-sans-3/index.css'
import { useLanguage } from '../lib/hooks/useLanguage'
import { LanguageContext } from '../lib/i18n'
import ProjectPage from './pages/ProjectPage'
import './styles/global.css'

export default function App() {
  const [language, toggleLanguage] = useLanguage()
  return (
    <LanguageContext.Provider value={language}>
      <ProjectPage onToggleLanguage={toggleLanguage} />
    </LanguageContext.Provider>
  )
}
