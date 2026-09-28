import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { DEMO_VIEWPORT, demoCategories, demoUrl, frontendDemos } from '../../shared'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { rich } from '../../lib/rich'
import { useLanguageCode, useTr } from '../../lib/i18n'
import { frontend as FE } from '../copy'
import CopyLink from './CopyLink'
import TodoBadge from './TodoBadge'

const categories = demoCategories.filter(c => c.id !== 'all')
const ordered = categories.flatMap(c => frontendDemos.filter(d => d.cat === c.id))
const pad = n => String(n).padStart(2, '0')

function Thumb({ item }) {
  const src = item.poster ?? item.cover
  if (src) return <img src={src} alt="" loading="lazy" />
  return <span className="v2-thumb-hue" style={{ background: `linear-gradient(135deg, ${item.hue[0]}, ${item.hue[1]})` }} />
}

// The live demo. It is released (src = about:blank) before unmounting so WebGL, audio,
// and the camera stop at once.
// The demo never takes keyboard focus by itself: page scrolling keys keep working until the
// reader clicks into it.
function DemoFrame({ src, title }) {
  const ref = useRef(null)
  useEffect(() => {
    const frame = ref.current
    if (frame.getAttribute('src') !== src) frame.src = src // StrictMode re-runs effects in development
    return () => { frame.src = 'about:blank' }
  }, [src])
  return (
    <div className="v2-stage-frame">
      <iframe ref={ref} src={src} title={title} allow="autoplay; fullscreen; camera; microphone; gamepad"
        style={{ width: DEMO_VIEWPORT[0], height: DEMO_VIEWPORT[1] }} />
    </div>
  )
}

const DemoViewer = forwardRef(function DemoViewer({ actionsOverlay = false }, ref) {
  const tr = useTr()
  const language = useLanguageCode()
  const phone = useMediaQuery('(max-width: 719.98px)')
  const [selectedId, setSelectedId] = useState(frontendDemos[0].id)
  const [mode, setMode] = useState(null) // null = default for the item
  const [onScreen, setOnScreen] = useState(false)
  const [phoneLoaded, setPhoneLoaded] = useState(false)
  const [playRecording, setPlayRecording] = useState(false)
  const stageRef = useRef(null)
  const sheetRef = useRef(null)
  const item = frontendDemos.find(d => d.id === selectedId)
  const url = demoUrl(item, language)
  const view = item.pending ? 'pending' : (mode ?? (url ? 'demo' : 'video'))

  // Deep links select an item without loading it.
  useImperativeHandle(ref, () => ({ select: id => { setSelectedId(id); setMode(null); setPhoneLoaded(false) } }), [])

  useEffect(() => {
    const stage = stageRef.current
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.intersectionRatio >= 0.2), { threshold: [0, 0.2, 0.5] })
    observer.observe(stage)
    const resize = new ResizeObserver(() => stage.style.setProperty('--demo-scale', String(stage.clientWidth / DEMO_VIEWPORT[0])))
    resize.observe(stage)
    return () => { observer.disconnect(); resize.disconnect() }
  }, [])

  const select = id => {
    setSelectedId(id)
    setMode(null)
    setPhoneLoaded(false)
    setPlayRecording(false)
  }

  const onSheetKey = event => {
    if (document.activeElement?.tagName === 'IFRAME') return
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
    if (!delta) return
    event.preventDefault()
    const index = ordered.findIndex(d => d.id === selectedId)
    const next = ordered[(index + delta + ordered.length) % ordered.length]
    select(next.id)
    sheetRef.current?.querySelector(`[data-id="${next.id}"]`)?.focus()
  }

  // Interactive first: on desktop the demo loads as soon as the stage is on screen; phones wait
  // for a tap to save battery and data.
  const loaded = phone ? phoneLoaded : true
  const mountDemo = view === 'demo' && loaded && onScreen
  let stage
  if (view === 'pending') {
    stage = (
      <div className="v2-stage-poster is-pending" style={{ background: `linear-gradient(135deg, ${item.hue[0]}, ${item.hue[1]})` }}>
        <p className="v2-stage-pendingtitle">{tr(item.title)}</p>
        <p className="v2-stage-pendingnote"><TodoBadge /> {tr(FE.pending)}</p>
      </div>
    )
  } else if (view === 'video') {
    stage = <video key={item.video} src={item.video} poster={item.poster} controls muted playsInline preload="metadata" autoPlay={playRecording} aria-label={tr(item.title)} />
  } else if (mountDemo) {
    stage = <DemoFrame key={`${item.id}-${language}`} src={url} title={tr(item.title)} />
  } else {
    stage = (
      <div className="v2-stage-poster">
        <Thumb item={item} />
        {phone ? (
          <div className="v2-stage-phone">
            {!actionsOverlay && <a className="v2-btn is-primary" href={url} target="_blank" rel="noopener noreferrer">{tr(FE.openInteractive)}</a>}
            <button type="button" className="v2-btn" onClick={() => setPhoneLoaded(true)}>{tr(FE.loadHere)}</button>
            {item.video && <button type="button" className="v2-btn" onClick={() => { setMode('video'); setPlayRecording(true) }}>{tr(FE.playRecording)}</button>}
          </div>
        ) : (
          <span className="v2-stage-load" aria-hidden="true">▶ {tr(FE.load)}</span>
        )}
      </div>
    )
  }

  const kinds = [item.demo && tr(FE.interactive), item.video && tr(FE.recording)].filter(Boolean)
  return (
    <div className="v2-demos v2-wide">
      <div className="v2-sheet" ref={sheetRef} onKeyDown={onSheetKey}>
        {categories.map(cat => {
          const items = frontendDemos.filter(d => d.cat === cat.id)
          return (
            <div key={cat.id} className="v2-sheet-group">
              <p className="v2-label">{tr(cat.label)} · <span className="v2-num">{items.length}</span></p>
              <div className="v2-sheet-items">
                {items.map(d => (
                  <button key={d.id} type="button" data-id={d.id} className="v2-sheet-item" aria-pressed={d.id === selectedId}
                    tabIndex={d.id === selectedId ? 0 : -1} onClick={() => select(d.id)}>
                    <span className="v2-thumb">
                      <Thumb item={d} />
                      {d.video && <span className="v2-thumb-play" aria-hidden="true">▶</span>}
                      {d.pending && <span className="v2-thumb-todo"><TodoBadge /></span>}
                    </span>
                    <span className="v2-sheet-title">{tr(d.title)}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {!actionsOverlay && url && view !== 'pending' && !(phone && view === 'demo' && !phoneLoaded) && (
        <p className="v2-stage-bar"><a className="v2-stage-open" href={url} target="_blank" rel="noopener noreferrer">{tr(FE.openShort)}</a></p>
      )}
      <div id="demo-figure" className="v2-stage v2-bleed" ref={stageRef}>
        {stage}
        {actionsOverlay && (
          <div className="v2-stage-overlay">
            {url && view !== 'pending' && <a className="v2-stage-open" href={url} target="_blank" rel="noopener noreferrer">{tr(FE.openShort)}</a>}
            <CopyLink id={item.id} />
          </div>
        )}
      </div>

      <div className="v2-stage-info">
        <p className="v2-kicker">
          <span className="v2-num">{pad(ordered.indexOf(item) + 1)} / {pad(ordered.length)}</span> · {tr(demoCategories.find(c => c.id === item.cat).label)}
          {kinds.length > 0 && <> · {kinds.join(' · ')}</>}
        </p>
        <h3>{tr(item.title)}</h3>
        <p className="v2-stage-body">{rich(tr(item.body))}</p>
        {view === 'demo' && <p className="v2-fine">{tr(FE.note)}</p>}
        {(!actionsOverlay || (item.demo && item.video)) && <p className="v2-stage-actions">
          {item.demo && item.video && (
            <span className="v2-switch" role="group" aria-label={tr(FE.showAs)}>
              <button type="button" aria-pressed={view === 'demo'} onClick={() => setMode('demo')}>{tr(FE.interactive)}</button>
              <button type="button" aria-pressed={view === 'video'} onClick={() => { setMode('video'); setPlayRecording(true) }}>{tr(FE.recording)}</button>
            </span>
          )}
          {!actionsOverlay && url && <a className="v2-link" href={url} target="_blank" rel="noopener noreferrer">{tr(FE.openNewTab)}</a>}
          {!actionsOverlay && <CopyLink id={item.id} />}
        </p>}
      </div>
    </div>
  )
})

export default DemoViewer
