import { useEffect, useLayoutEffect, useRef } from 'react'
import { useTr } from '../../lib/i18n'
import { SECTION_ORDER, tocLabels, ui } from '../copy'

// Docked (≥1280px, hideable) or a drawer with a focus trap.
export default function Toc({ docked, visible, active, onHide, onNavigate, collapsible = true }) {
  const tr = useTr()
  const navRef = useRef(null)
  const hideRef = useRef(onHide)
  useLayoutEffect(() => { hideRef.current = onHide })
  const drawer = !docked

  useEffect(() => {
    if (!drawer || !visible) return
    const nav = navRef.current
    const previous = document.activeElement
    const focusables = () => [...nav.querySelectorAll('button, a[href]')]
    focusables()[0]?.focus()
    const onKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); hideRef.current() }
      if (event.key !== 'Tab') return
      const items = focusables()
      const first = items[0], last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      // The opener may have been swapped out meanwhile (e.g. the crumb); fall back to the menu button.
      const back = previous?.isConnected ? previous : document.querySelector('.v2-bar-toc')
      back?.focus({ preventScroll: true })
    }
  }, [drawer, visible])

  const onLink = (event, id) => {
    event.preventDefault()
    onNavigate(id)
  }

  return (
    <>
      {drawer && visible && <div className="v2-scrim" onClick={onHide} aria-hidden="true" />}
      <nav id="v2-toc" ref={navRef} className={`v2-toc${docked ? ' is-docked' : ' is-drawer'}${visible ? ' is-open' : ''}`}
        role={drawer ? 'dialog' : undefined} aria-modal={drawer && visible ? 'true' : undefined}
        aria-label={tr(ui.contents)} aria-hidden={!visible} inert={visible ? undefined : ''}>
        <div className="v2-toc-head">
          <span className="v2-label">{tr(ui.contents)}</span>
          {collapsible && <button type="button" className="v2-iconbtn v2-toc-hide" onClick={onHide} aria-expanded={visible} aria-label={tr(ui.hideContents)} title={tr(ui.hideContents)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>}
        </div>
        <ol>
          {SECTION_ORDER.map(id => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={event => onLink(event, id)}>{tr(tocLabels[id])}</a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
