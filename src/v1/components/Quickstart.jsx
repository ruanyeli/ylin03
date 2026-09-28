import { useState } from 'react'
import { quickstart, ui } from '../data/content'
import { useTr } from '../../lib/i18n'
import Section from './Section'

const Todo = () => <span className="todo-badge">TODO</span>

export default function Quickstart() {
  const tr = useTr()
  const [tab, setTab] = useState(quickstart.tabs[0].id)
  const [copied, setCopied] = useState(false)
  const current = quickstart.tabs.find(x => x.id === tab)
  const copy = async () => {
    try { await navigator.clipboard.writeText(current.code); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { setCopied(false) }
  }
  return (
    <Section id="quickstart" title={quickstart.title} intro={quickstart.intro}>
      <h3 className="subhead">{tr(quickstart.getTitle)}</h3>
      <ul className="get-grid">
        {quickstart.get.map(item => (
          <li key={tr(item.name)}>
            <a className="get-card" href={item.href} aria-disabled={item.todo || undefined} onClick={item.todo ? e => e.preventDefault() : undefined}>
              <span className="get-name">{tr(item.name)} {item.todo && <Todo />}</span>
              <span className="get-body">{tr(item.body)}</span>
              <span className="get-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>

      <h3 className="subhead">{tr(quickstart.serveTitle)}</h3>
      <div className="code-card">
        <div className="code-head">
          <div className="code-tabs" role="tablist">
            {quickstart.tabs.map(x => (
              <button key={x.id} type="button" role="tab" aria-selected={x.id === tab} onClick={() => setTab(x.id)}>{tr(x.label)}</button>
            ))}
          </div>
          <button type="button" className="code-copy" onClick={copy}>{tr(copied ? ui.copied : ui.copy)}</button>
        </div>
        <pre><code>{current.code}</code></pre>
      </div>
      <p className="fine-print"><Todo /> {tr(quickstart.todoNote)}</p>

      <h3 className="subhead">{tr(quickstart.agentsTitle)}</h3>
      <p className="prose">{tr(quickstart.agents)}</p>
      <p className="fine-print"><Todo /> {tr(quickstart.agentsTodo)}</p>
    </Section>
  )
}
