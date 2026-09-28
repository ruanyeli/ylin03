import { useEffect, useRef } from 'react'
import { useTr } from '../../lib/i18n'
import CopyLink from './CopyLink'

// One player; the reader picks the recording (tabs) or the cut of one recording (cuts).
// The frame keeps the narrowest aspect ratio in the set, so switching never changes its height.
export function Player({ item, autoPlay, label }) {
  const ref = useRef(null)
  useEffect(() => {
    const video = ref.current
    if (video && autoPlay) video.play().catch(() => {})
  }, [item.video, autoPlay])
  return (
    <video ref={ref} key={item.video} src={item.video} poster={item.poster} controls muted playsInline
      preload={item.preload ?? 'metadata'} aria-label={label} />
  )
}

export const frameRatio = items => Math.min(...items.map(i => i.size[0] / i.size[1]))

export function RecordingTabs({ items, selected, onSelect, autoPlay, label }) {
  const tr = useTr()
  const listRef = useRef(null)
  const item = items.find(i => i.id === selected) ?? items[0]
  const onKeyDown = event => {
    const index = items.findIndex(i => i.id === item.id)
    const delta = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!delta) return
    event.preventDefault()
    const next = items[(index + delta + items.length) % items.length]
    onSelect(next.id, false)
    listRef.current?.querySelector(`[data-id="${next.id}"]`)?.focus()
  }
  return (
    <>
      <div className="v2-tabs" role="tablist" aria-label={tr(label)} ref={listRef} onKeyDown={onKeyDown}>
        {items.map(it => (
          <button key={it.id} type="button" role="tab" data-id={it.id} aria-selected={it.id === item.id} tabIndex={it.id === item.id ? 0 : -1}
            className="v2-tab" onClick={() => onSelect(it.id, true)}>
            <span className="v2-tab-meta"><span className="v2-tab-tag">{tr(it.tag)}</span><span className="v2-num">{it.duration}</span></span>
            <span className="v2-tab-title">{tr(it.title)}</span>
          </button>
        ))}
      </div>
      <div className="v2-player v2-bleed" style={{ aspectRatio: String(frameRatio(items)) }} role="tabpanel">
        <Player item={item} autoPlay={autoPlay} label={tr(item.title)} />
      </div>
      <div className="v2-player-cap">
        <span>{tr(item.tag)} · <span className="v2-num">{item.duration}</span></span>
        <CopyLink id={item.id} />
      </div>
    </>
  )
}

export function RecordingCuts({ title, cuts, selected, onSelect, autoPlay, shareId, label }) {
  const tr = useTr()
  const cut = cuts.find(c => c.id === selected) ?? cuts[0]
  return (
    <div className="v2-cuts">
      <p className="v2-cuts-title">{tr(title)}</p>
      {cuts.length > 1 && (
        <div className="v2-switch v2-cuts-switch" role="group" aria-label={tr(label)}>
          {cuts.map(c => (
            <button key={c.id} type="button" aria-pressed={c.id === cut.id} onClick={() => onSelect(c.id)}>{tr(c.label)}</button>
          ))}
        </div>
      )}
      <div className="v2-player v2-bleed" style={{ aspectRatio: String(frameRatio(cuts)) }}>
        <Player item={{ ...cut, preload: cut.minutes > 10 ? 'none' : 'metadata' }} autoPlay={autoPlay} label={tr(title)} />
      </div>
      <div className="v2-player-cap">
        <span>{tr(cut.label)}</span>
        <CopyLink id={shareId} />
      </div>
    </div>
  )
}
