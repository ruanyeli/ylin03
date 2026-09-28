import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import lockup from '../../assets/iquest-lockup.png'
import { links } from '../../shared'
import { useTr } from '../../lib/i18n'
import { tocLabels, ui } from '../copy'
import ExtLink from './ExtLink'

export default function TopBar({ language, onLanguage, tocVisible, tocDocked, onOpenToc, active, showTocControls = true }) {
  const tr = useTr()
  const barRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [pastHeader, setPastHeader] = useState(false)

  // Progress line and scroll-dependent states, updated once per frame.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      barRef.current?.style.setProperty('--p', String(max > 0 ? Math.min(1, window.scrollY / max) : 0))
      setScrolled(window.scrollY > 8)
      const head = document.getElementById('top')
      setPastHeader(head ? head.getBoundingClientRect().bottom < 56 : false)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [])

  const showCrumb = showTocControls && !tocVisible && pastHeader && active
  return (
    <header className={`v2-bar${scrolled ? ' is-scrolled' : ''}${showCrumb ? ' has-crumb' : ''}`} ref={barRef}>
      {showTocControls && !(tocDocked && tocVisible) && (
        <button type="button" className="v2-iconbtn v2-bar-toc" aria-controls="v2-toc" aria-expanded={tocVisible} aria-label={tr(ui.showContents)} title={tr(ui.showContents)} onClick={onOpenToc}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
        </button>
      )}
      <a className="v2-bar-brand" href="#top">
        <img className="v2-bar-lockup" src={lockup} alt="IQuest Research 至知创新研究院" width="130" height="28" />
        <img className="v2-bar-mark" src={logo} alt="IQuest Research" width="22" height="22" />
      </a>
      {showCrumb && (
        <button type="button" className="v2-crumb" aria-controls="v2-toc" onClick={onOpenToc}>
          <span>{tr(tocLabels[active])}</span> <span aria-hidden="true">▾</span>
        </button>
      )}
      <span className="v2-bar-spacer" />
      <nav className="v2-bar-links" aria-label={tr(ui.resources)}>
        <ExtLink href={links.report}>{tr(ui.reportLink)}</ExtLink>
        <ExtLink href={links.github}>GitHub</ExtLink>
        <ExtLink href={links.huggingface}>Hugging Face</ExtLink>
      </nav>
      <div className="v2-lang" role="group" aria-label={tr(ui.languageGroup)}>
        <button type="button" aria-pressed={language === 'en'} onClick={() => language !== 'en' && onLanguage()} lang="en">EN</button>
        <span aria-hidden="true">/</span>
        <button type="button" aria-pressed={language === 'zh'} onClick={() => language !== 'zh' && onLanguage()} lang="zh-CN">中文</button>
      </div>
      <div className="v2-progress" aria-hidden="true" />
    </header>
  )
}
