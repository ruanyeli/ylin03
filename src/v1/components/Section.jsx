import { nav } from '../data/content'
import { useTr } from '../../lib/i18n'

export default function Section({ id, title, intro, tone, children }) {
  const tr = useTr()
  const index = nav.findIndex(item => item.id === id) + 1
  return (
    <section id={id} className={`section${tone ? ` section-${tone}` : ''}`}>
      <div className="section-inner">
        <header className="section-head">
          {index > 0 && <p className="section-index">{String(index).padStart(2, '0')} · {tr(nav[index - 1].label)}</p>}
          <h2>{tr(title)}</h2>
          {intro && <p className="section-intro">{tr(intro)}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
