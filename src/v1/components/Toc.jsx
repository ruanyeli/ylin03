import { nav, ui } from '../data/content'
import { useTr } from '../../lib/i18n'

export default function Toc({ open, overlay, active, onNavigate, onClose }) {
  const tr = useTr()
  return (
    <>
      {overlay && open && <div className="toc-backdrop" onClick={onClose} aria-hidden="true" />}
      <aside id="toc" className={`toc${open ? ' is-open' : ''}${overlay ? ' is-overlay' : ''}`} aria-label={tr(ui.contents)} aria-hidden={!open} inert={open ? undefined : ''}>
        <div className="toc-inner">
          <div className="toc-head">
            <p className="toc-title">{tr(ui.contents)}</p>
            <button type="button" className="icon-button toc-close" onClick={onClose} aria-label={tr(ui.hideContents)} title={tr(ui.hideContents)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
          </div>
          <ol className="toc-list">
            {nav.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={active === item.id ? 'is-active' : undefined} aria-current={active === item.id ? 'location' : undefined} onClick={onNavigate}>
                  <span className="toc-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{tr(item.label)}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </>
  )
}
