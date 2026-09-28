import { useState } from 'react'
import { downloads, isPlaceholder, links, serveSnippets } from '../../shared'
import { useTr } from '../../lib/i18n'
import { quickstart as Q, ui } from '../copy'
import CopyButton from './CopyButton'
import ExtLink from './ExtLink'
import Section from './Section'
import TodoBadge from './TodoBadge'

export default function Quickstart() {
  const tr = useTr()
  const [tab, setTab] = useState(serveSnippets[0].id)
  const current = serveSnippets.find(s => s.id === tab)
  const onTabKey = event => {
    const delta = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!delta) return
    event.preventDefault()
    const index = serveSnippets.findIndex(s => s.id === tab)
    const next = serveSnippets[(index + delta + serveSnippets.length) % serveSnippets.length]
    setTab(next.id)
    document.getElementById(`serve-tab-${next.id}`)?.focus()
  }
  return (
    <Section id="quickstart" title={Q.title} intro={Q.intro}>
      <h3>{tr(Q.getTitle)}</h3>
      <ul className="v2-downloads">
        {downloads.map(d => (
          <li key={d.id}>
            <span className="v2-downloads-name">
              <ExtLink href={links[d.id]}>{tr(d.name)}</ExtLink>
              {isPlaceholder(links[d.id]) && <TodoBadge />}
            </span>
            <span className="v2-downloads-body">{tr(d.body)}</span>
            <span className="v2-downloads-arrow" aria-hidden="true">↗</span>
          </li>
        ))}
      </ul>

      <h3>{tr(Q.serveTitle)}</h3>
      <div className="v2-code">
        <div className="v2-code-head">
          <div className="v2-switch" role="tablist" aria-label={tr(Q.serveTitle)} onKeyDown={onTabKey}>
            {serveSnippets.map(s => (
              <button key={s.id} id={`serve-tab-${s.id}`} type="button" role="tab" aria-selected={s.id === tab} aria-controls="serve-panel"
                tabIndex={s.id === tab ? 0 : -1} onClick={() => setTab(s.id)}>{tr(s.label)}</button>
            ))}
          </div>
          <CopyButton getText={() => current.code} />
        </div>
        <pre id="serve-panel" role="tabpanel" aria-labelledby={`serve-tab-${tab}`} tabIndex={0}><code>{current.code.split('\n').map((line, i) => (
          <span key={i} className={line.includes(ui.todo) ? 'is-todo' : undefined}>{line}{'\n'}</span>
        ))}</code></pre>
      </div>
      <p className="v2-fine"><TodoBadge /> {tr(Q.todoNote)}</p>

      <h3>{tr(Q.agentsTitle)}</h3>
      <p>{tr(Q.agents)}</p>
      <p className="v2-fine"><TodoBadge /> {tr(Q.agentsTodo)}</p>
    </Section>
  )
}
