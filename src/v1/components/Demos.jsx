import { useCallback, useEffect, useRef, useState } from 'react'
import { ui } from '../data/content'
import { frontend, office, rdCases } from '../data/demos'
import { useLanguageCode, useTr } from '../../lib/i18n'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import Section from './Section'

export const SELECT_EVENT = 'iquest:select'
export const selectItem = id => window.dispatchEvent(new CustomEvent(SELECT_EVENT, { detail: id }))

// Listens for ?demo=<id> / in-page requests to show a specific item.
function useSelectRequest(items, onSelect) {
  useEffect(() => {
    const handler = event => { if (items.some(i => i.id === event.detail)) onSelect(event.detail) }
    window.addEventListener(SELECT_EVENT, handler)
    return () => window.removeEventListener(SELECT_EVENT, handler)
  }, [items, onSelect])
}

function CopyLink({ id }) {
  const tr = useTr()
  const language = useLanguageCode()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    const url = new URL(window.location.href)
    const version = url.searchParams.get('v')
    url.search = ''
    url.hash = ''
    if (version) url.searchParams.set('v', version)
    url.searchParams.set('demo', id)
    if (language === 'zh') url.searchParams.set('lang', 'zh')
    try {
      await navigator.clipboard.writeText(url.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { window.prompt(tr(ui.copyLink), url.toString()) }
  }
  return (
    <button type="button" className="copy-link" onClick={copy}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
      {tr(copied ? ui.linkCopied : ui.copyLink)}
    </button>
  )
}

function Player({ src, poster, autoPlay, label }) {
  const ref = useRef(null)
  useEffect(() => {
    const video = ref.current
    if (video && autoPlay) video.play().catch(() => {})
  }, [src, autoPlay])
  return (
    <div className="player">
      <video ref={ref} key={src} src={src} poster={poster} controls muted playsInline preload="metadata" aria-label={label} />
    </div>
  )
}

function CaseNotes({ item }) {
  const tr = useTr()
  return (
    <div className="case-notes">
      <p className="case-tag">{tr(item.tag)} <CopyLink id={item.id} /></p>
      <h3>{tr(item.title)}</h3>
      <p className="case-lead">{tr(item.lead)}</p>
      {item.flow && (
        <ol className="flow">{item.flow.map((step, i) => <li key={i}>{tr(step)}</li>)}</ol>
      )}
      <dl className="notes">
        {item.notes.map(([k, v], i) => <div key={i}><dt>{tr(k)}</dt><dd>{tr(v)}</dd></div>)}
      </dl>
      {item.stats && (
        <dl className="stat-row compact">
          {item.stats.map(s => <div key={s.value}><dt>{s.value}</dt><dd>{tr(s.label)}</dd></div>)}
        </dl>
      )}
    </div>
  )
}

export function RdCases() {
  const tr = useTr()
  const [activeId, setActiveId] = useState(rdCases.items[0].id)
  const [interacted, setInteracted] = useState(false)
  const item = rdCases.items.find(i => i.id === activeId)

  useSelectRequest(rdCases.items, useCallback(id => { setActiveId(id); setInteracted(false) }, []))

  return (
    <Section id="rd-cases" title={rdCases.title} intro={rdCases.intro} tone="dark">
      <div className="theater">
        <div className="theater-main">
          <Player src={item.video} poster={item.poster} autoPlay={interacted} label={tr(item.title)} />
        </div>
        <div className="playlist" role="tablist" aria-label={tr(rdCases.title)}>
          {rdCases.items.map(it => (
            <button key={it.id} type="button" role="tab" aria-selected={it.id === activeId} className="playlist-item"
              onClick={() => { setActiveId(it.id); setInteracted(true) }}>
              <span className="playlist-thumb">
                <img src={it.poster} alt="" loading="lazy" />
                <span className="playlist-duration">{it.duration}</span>
                {it.id === activeId && <span className="playlist-now">{tr(ui.nowPlaying)}</span>}
              </span>
              <span className="playlist-text">
                <span className="playlist-tag">{tr(it.tag)}</span>
                <span className="playlist-title">{tr(it.title)}</span>
              </span>
            </button>
          ))}
        </div>
        <CaseNotes item={item} />
      </div>
    </Section>
  )
}

export function Office() {
  const tr = useTr()
  const [activeId, setActiveId] = useState(office.items[0].id)
  const [versionId, setVersionId] = useState('fast')
  const [interacted, setInteracted] = useState(false)
  useSelectRequest(office.items, useCallback(id => setActiveId(id), []))
  const item = office.items.find(i => i.id === activeId)
  const version = item.versions?.find(v => v.id === versionId) ?? item.versions?.[0]

  return (
    <Section id="office" title={office.title} intro={office.intro}>
      <div className="tabs" role="tablist" aria-label={tr(office.title)}>
        {office.items.map(it => (
          <button key={it.id} type="button" role="tab" aria-selected={it.id === activeId} className="tab" onClick={() => setActiveId(it.id)}>
            {tr(it.tab)}
            <span className={`tab-kind${it.versions ? ' has-video' : ''}`}>{tr(it.versions ? ui.video : ui.noVideo)}</span>
          </button>
        ))}
      </div>
      <div className={`office-panel${version ? '' : ' is-text'}`} role="tabpanel">
        {version && (
          <div className="office-media">
            <Player src={version.video} poster={version.poster} autoPlay={interacted} label={tr(item.title)} />
            <div className="segmented" role="group" aria-label={tr(ui.speed)}>
              {item.versions.map(v => (
                <button key={v.id} type="button" aria-pressed={v.id === version.id} onClick={() => { setVersionId(v.id); setInteracted(true) }}>{tr(v.label)}</button>
              ))}
            </div>
          </div>
        )}
        <CaseNotes item={item} />
      </div>
    </Section>
  )
}

function Cover({ item, small }) {
  const tr = useTr()
  const src = item.poster ?? item.cover
  if (src) return <img src={src} alt="" loading="lazy" />
  return (
    <span className={`cover-type${small ? ' is-small' : ''}`} style={{ '--c1': item.hue[0], '--c2': item.hue[1] }}>
      <span className="cover-title">{tr(item.title)}</span>
    </span>
  )
}

const DEMO_VIEWPORT = [1280, 800]

export function Frontend() {
  const tr = useTr()
  const zh = useLanguageCode() === 'zh'
  const compact = useMediaQuery('(max-width: 720px)')
  const [cat, setCat] = useState('all')
  const [activeId, setActiveId] = useState(frontend.items[0].id)
  const [mode, setMode] = useState(null)
  const [interacted, setInteracted] = useState(false)
  const [tapped, setTapped] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const stripRef = useRef(null)
  const stageRef = useRef(null)
  const visible = frontend.items.filter(i => cat === 'all' || i.cat === cat)
  const item = visible.find(i => i.id === activeId) ?? visible[0]
  const index = visible.indexOf(item)
  const demoUrl = item.demo ? `./demos/${item.demo}/${!zh && item.demoEn ? 'index_en.html' : 'index.html'}` : null
  // Interactive demos come first; a recording, where one exists, is the alternative view.
  const view = mode ?? (demoUrl ? 'demo' : item.video ? 'video' : 'pending')
  // Demos start by themselves while the stage is on screen (a tap is required on phones) and
  // are unloaded when it scrolls away, so WebGL scenes never run in the background.
  const runDemo = view === 'demo' && onScreen && (!compact || tapped)
  const catLabel = id => tr(frontend.categories.find(c => c.id === id).label)

  const show = id => { setActiveId(id); setMode(null); setTapped(false) }
  const select = id => { show(id); setInteracted(true) }
  useSelectRequest(frontend.items, useCallback(id => { setCat('all'); setActiveId(id); setMode(null); setTapped(false) }, []))
  const step = delta => select(visible[(index + delta + visible.length) % visible.length].id)
  const filter = id => {
    setCat(id)
    show(frontend.items.find(i => id === 'all' || i.cat === id).id)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(stageRef.current)
    return () => observer.disconnect()
  }, [])

  // Demos are laid out for a desktop window, so they always render at DEMO_VIEWPORT and are
  // scaled down to the stage instead of being squeezed (which crops their top and bottom).
  useEffect(() => {
    const stage = stageRef.current
    const resize = new ResizeObserver(() => stage.style.setProperty('--demo-scale', String(stage.clientWidth / DEMO_VIEWPORT[0])))
    resize.observe(stage)
    return () => resize.disconnect()
  }, [])

  useEffect(() => {
    const strip = stripRef.current
    const thumb = strip?.querySelector('[aria-selected="true"]')
    if (strip && thumb) strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2, behavior: 'smooth' })
  }, [item.id, cat])

  const kind = it => [it.demo && tr(ui.interactive), it.video && tr(ui.video)].filter(Boolean).join(' · ') || tr(ui.demoPending)

  return (
    <Section id="frontend" title={frontend.title} intro={frontend.intro} tone="tint">
      <div className="chip-filter" role="group" aria-label="Filter">
        {frontend.categories.map(c => (
          <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => filter(c.id)}>
            {tr(c.label)} <span className="chip-count">{c.id === 'all' ? frontend.items.length : frontend.items.filter(i => i.cat === c.id).length}</span>
          </button>
        ))}
      </div>

      <div className="showcase">
        <div className="strip-wrap" onKeyDown={event => {
          if (event.key === 'ArrowRight') { event.preventDefault(); step(1) }
          if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) }
        }}>
          <button type="button" className="strip-arrow" onClick={() => step(-1)} aria-label="Previous">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <div className="strip" ref={stripRef} role="tablist" aria-label={tr(frontend.title)}>
            {visible.map(it => (
              <button key={it.id} type="button" role="tab" aria-selected={it.id === item.id} className="strip-item" onClick={() => select(it.id)} title={tr(it.title)}>
                <span className="strip-thumb">
                  <Cover item={it} small />
                  <span className="strip-kinds">
                    {it.demo && <span className="kind-dot is-demo" title={tr(ui.interactive)} />}
                    {it.video && <span className="kind-dot is-video" title={tr(ui.video)} />}
                  </span>
                </span>
                <span className="strip-label">{tr(it.title)}</span>
              </button>
            ))}
          </div>
          <button type="button" className="strip-arrow" onClick={() => step(1)} aria-label="Next">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>

        <div className="stage-bar">
          <span className="stage-kind">{kind(item)}</span>
          {demoUrl && item.video && (
            <div className="segmented" role="group" aria-label={tr(ui.showAs)}>
              <button type="button" aria-pressed={view === 'demo'} onClick={() => setMode('demo')}>{tr(ui.interactive)}</button>
              <button type="button" aria-pressed={view === 'video'} onClick={() => { setMode('video'); setInteracted(true) }}>{tr(ui.video)}</button>
            </div>
          )}
        </div>
        <div className="stage" ref={stageRef}>
          {view === 'video'
            ? <video key={item.video} src={item.video} poster={item.poster} controls muted playsInline preload="metadata" autoPlay={interacted} aria-label={tr(item.title)} />
            : view === 'pending'
              ? (
                <div className="stage-load is-pending">
                  <Cover item={item} />
                  <span className="stage-load-cta"><span className="todo-badge">{ui.todo}</span>{tr(ui.demoPending)}</span>
                </div>
              )
              : runDemo
                ? (
                  <div className="stage-frame">
                    <iframe key={`${item.id}-${zh}`} src={demoUrl} title={tr(item.title)} allow="autoplay; fullscreen; camera; microphone; gamepad" allowFullScreen />
                  </div>
                )
                : (
                  <button type="button" className="stage-load" onClick={() => setTapped(true)}>
                    <Cover item={item} />
                    <span className="stage-load-cta"><span className="play-icon" aria-hidden="true" />{tr(ui.loadDemo)}</span>
                  </button>
                )}
        </div>

        <div className="stage-info">
          <div>
            <p className="case-tag">{String(frontend.items.indexOf(item) + 1).padStart(2, '0')} · {catLabel(item.cat)} · {kind(item)}</p>
            <h3>{tr(item.title)}</h3>
            <p>{tr(item.body)}</p>
            {view === 'demo' && <p className="fine-print">{tr(ui.demoNote)}</p>}
          </div>
          <div className="stage-actions">
            <CopyLink id={item.id} />
            {demoUrl && <a className="button button-primary" href={demoUrl} target="_blank" rel="noopener noreferrer">{tr(ui.openInNewTab)} ↗</a>}
            <span className="stage-count">{index + 1} / {visible.length}</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
