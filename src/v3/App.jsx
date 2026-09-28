import '@fontsource-variable/source-sans-3/wght.css'
import '@fontsource-variable/source-serif-4/opsz.css'
import { useEffect, useRef } from 'react'
import { useLanguage } from '../lib/hooks/useLanguage'
import { LanguageContext, useTr } from '../lib/i18n'
import { model, links, t } from '../shared'
import Page from '../v2/Page'
import ExtLink from '../v2/components/ExtLink'
import { header, ui } from '../v2/copy'
import logo from '../assets/logo.png'
import '../v2/styles.css'
import './styles.css'

function ReadingProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0
      ref.current?.style.setProperty('--p', String(progress))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])
  return <div ref={ref} className="v2-progress" aria-hidden="true" />
}

function SiteNavigation({ language, onLanguage, onOpenToc, tocVisible, tocDocked }) {
  const tr = useTr()
  return (
    <header className="site-nav">
      {!tocDocked && (
        <button type="button" className="v2-iconbtn v2-bar-toc" onClick={onOpenToc} aria-controls="v2-toc" aria-expanded={tocVisible} aria-label={tr(t('Open contents', '展开目录'))} title={tr(t('Open contents', '展开目录'))}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          <span>{tr(t('Contents', '目录'))}</span>
        </button>
      )}
      <a href="#top" className="site-brand"><img src={logo} alt="" width="34" height="34" /><span>IQuest<span className="site-brand-lab"> Research</span></span></a>
      <div className="site-nav-tools">
        <nav className="v2-bar-links" aria-label={tr(ui.resources)}>
          <ExtLink href={links.report}>{tr(ui.reportLink)}</ExtLink>
          <ExtLink href={links.github}>GitHub</ExtLink>
          <ExtLink href={links.huggingface}>Hugging Face</ExtLink>
        </nav>
        <button className="site-language" onClick={onLanguage} aria-label={tr(t('Switch to Chinese', '切换到英文'))}>{language === 'zh' ? 'EN' : '中文'}</button>
      </div>
      <ReadingProgress />
    </header>
  )
}

function SiteHero() {
  const tr = useTr()
  return (
    <header id="top" className="site-hero">
      <div className="site-hero-art" aria-hidden="true">
        <div className="site-orbit site-orbit-one" /><div className="site-orbit site-orbit-two" />
        <span className="site-orbit-dot" />
      </div>
      <p className="site-eyebrow">{tr(header.kicker)}</p>
      <h1>{model.name}</h1>
      <p className="site-hero-title">{tr(header.tagline)}</p>
      <p className="site-hero-description">{tr(header.dek)}</p>
    </header>
  )
}

export default function App() {
  const [language, toggleLanguage] = useLanguage()
  return <LanguageContext.Provider value={language}><Page language={language} onToggleLanguage={toggleLanguage} Header={SiteHero} Navigation={SiteNavigation} persistentToc demoActionsOverlay /></LanguageContext.Provider>
}
