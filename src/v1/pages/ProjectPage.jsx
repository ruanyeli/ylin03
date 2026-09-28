import { useEffect, useState } from 'react'
import Citation from '../components/Citation'
import { Frontend, Office, RdCases, selectItem } from '../components/Demos'
import FontPicker from '../components/FontPicker'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Quickstart from '../components/Quickstart'
import Results from '../components/Results'
import { Architecture, Overview, Rsi, Training } from '../components/Sections'
import Toc from '../components/Toc'
import { footer, nav } from '../data/content'
import { sectionOfItem } from '../data/demos'
import { useActiveSection } from '../../lib/hooks/useActiveSection'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { useTr } from '../../lib/i18n'

const TOC_KEY = 'iquest.toc'
const SECTION_IDS = nav.map(item => item.id)
const readTocPreference = () => {
  try { return localStorage.getItem(TOC_KEY) !== 'hidden' } catch { return true }
}

export default function ProjectPage({ onToggleLanguage }) {
  const tr = useTr()
  const wide = useMediaQuery('(min-width: 1200px)')
  const [docked, setDocked] = useState(readTocPreference)
  const [drawer, setDrawer] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const tocOpen = wide ? docked : drawer

  useEffect(() => {
    try { localStorage.setItem(TOC_KEY, docked ? 'shown' : 'hidden') } catch { /* optional */ }
  }, [docked])
  useEffect(() => { if (wide) setDrawer(false) }, [wide])
  useEffect(() => {
    if (!drawer) return
    const onKey = event => { if (event.key === 'Escape') setDrawer(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawer])

  // ?demo=<id> opens the page on that recording or demo. The jump is repeated once fonts and
  // media have settled, because late layout shifts would otherwise leave the section off-screen.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('demo')
    const section = id && sectionOfItem(id)
    if (!section) return
    selectItem(id)
    const jump = () => {
      const el = document.getElementById(section)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'instant' })
    }
    const timers = [setTimeout(jump, 50), setTimeout(jump, 900)]
    document.fonts?.ready.then(jump)
    return () => timers.forEach(clearTimeout)
  }, [])

  // Only one recording plays at a time: starting a video pauses every other one on the page.
  useEffect(() => {
    const onPlay = event => {
      document.querySelectorAll('video').forEach(video => { if (video !== event.target && !video.paused) video.pause() })
    }
    document.addEventListener('play', onPlay, true)
    return () => document.removeEventListener('play', onPlay, true)
  }, [])

  const toggleToc = () => (wide ? setDocked(v => !v) : setDrawer(v => !v))
  const closeToc = () => (wide ? setDocked(false) : setDrawer(false))

  return (
    <div className={`page${wide && docked ? ' has-toc' : ''}`}>
      <Header tocOpen={tocOpen} onToggleToc={toggleToc} onToggleLanguage={onToggleLanguage} />
      <Toc open={tocOpen} overlay={!wide} active={active} onClose={closeToc} onNavigate={() => { if (!wide) setDrawer(false) }} />
      <main className="main">
        <Hero />
        <Overview />
        <Rsi />
        <Architecture />
        <Training />
        <Results />
        <RdCases />
        <Office />
        <Frontend />
        <Quickstart />
        <Citation />
        <footer className="footer">{tr(footer)}</footer>
      </main>
      <FontPicker />
    </div>
  )
}
