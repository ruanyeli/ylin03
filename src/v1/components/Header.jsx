import { useEffect, useRef } from 'react'
import logo from '../../assets/logo.png'
import { links, ui } from '../data/content'
import { useTr } from '../../lib/i18n'
import ExternalLink from './ExternalLink'

export default function Header({ tocOpen, onToggleToc, onToggleLanguage }) {
  const tr = useTr()
  const barRef = useRef(null)

  // Reading-progress hairline under the header; written straight to the DOM to avoid re-renders.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      barRef.current?.style.setProperty('--progress', String(max > 0 ? Math.min(1, window.scrollY / max) : 0))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button type="button" className="icon-button" aria-controls="toc" aria-expanded={tocOpen}
          title={tr(tocOpen ? ui.hideContents : ui.showContents)} aria-label={tr(tocOpen ? ui.hideContents : ui.showContents)} onClick={onToggleToc}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h16" /></svg>
        </button>
        <a className="brand" href="#top">
          <img src={logo} alt="" width="28" height="28" />
          <span>IQuest Research</span>
        </a>
      </div>
      <nav className="topbar-right" aria-label="Links">
        <ExternalLink className="topbar-link hide-sm" href={links.github}>GitHub</ExternalLink>
        <ExternalLink className="topbar-link hide-sm" href={links.huggingface}>Hugging Face</ExternalLink>
        <button type="button" className="lang-button" onClick={onToggleLanguage} aria-label={tr(ui.switchLanguageLabel)}>{tr(ui.switchLanguage)}</button>
        <ExternalLink className="button button-primary button-small" href={links.report}>{tr(ui.report)}</ExternalLink>
      </nav>
      <div className="topbar-progress" ref={barRef} aria-hidden="true" />
    </header>
  )
}
