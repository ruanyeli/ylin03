import { useState } from 'react'
import { formatAverage } from '../../shared'
import { results } from '../data/content'
import { useLanguageCode, useTr } from '../../lib/i18n'
import Section from './Section'

const HIGHLIGHT = 0 // index of IQuest-Q1 in results.models

const reported = scores => scores.filter(v => v != null)
const average = scores => { const r = reported(scores); return r.reduce((a, b) => a + b, 0) / r.length }
const fmt = formatAverage

function BenchCard({ bench }) {
  const tr = useTr()
  const zh = useLanguageCode() === 'zh'
  const [hover, setHover] = useState(null)
  const avg = average(bench.scores)
  const rows = bench.scores.map((score, model) => ({ score, model }))
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1) || (a.model === HIGHLIGHT ? -1 : 1))
  return (
    <figure className="bench-card">
      <figcaption className="bench-head">
        <span className="bench-name">{bench.name}{bench.source === 'figure' && <span className="bench-source">{tr(results.fromFigure)}</span>}</span>
      </figcaption>
      <div className="bench-plot" onMouseLeave={() => setHover(null)}>
        <div className="bench-avg" style={{ '--xf': avg / 100 }}>
          <span>{zh ? '均值' : 'avg'} {fmt(avg)}</span>
        </div>
        {rows.map(({ score, model }) => {
          const name = results.models[model]
          const active = hover === model && score != null
          return (
            <div key={model} className={`bench-row${model === HIGHLIGHT ? ' is-highlight' : ''}${active ? ' is-hover' : ''}${score == null ? ' is-missing' : ''}`}
              onMouseEnter={() => setHover(model)} onFocus={() => setHover(model)} onBlur={() => setHover(null)} tabIndex={0}
              aria-label={`${name}: ${score ?? '—'}`}>
              <span className="bench-model" title={name}>{results.shortModels[model]}</span>
              <span className="bench-track">
                {score != null && <span className="bench-bar" style={{ width: `${score}%` }} />}
                <span className="bench-value" style={{ left: `${score ?? 0}%` }}>{score ?? '—'}</span>
              </span>
              {active && (
                <span className="bench-tip" role="tooltip" style={{ '--xf': score / 100 }}>
                  <b>{name}</b>
                  <span>{bench.name} · {score}</span>
                  <span>{score - avg >= 0 ? '+' : '−'}{fmt(Math.abs(score - avg))} {zh ? '相对均值' : 'vs. average'}</span>
                </span>
              )}
            </div>
          )
        })}
      </div>
    </figure>
  )
}

function BenchTable() {
  const tr = useTr()
  return (
    <div className="table-scroll">
      <table className="bench-table">
        <thead>
          <tr>
            <th scope="col">{tr(results.benchmark)}</th>
            {results.models.map((m, i) => <th key={m} scope="col" className={i === HIGHLIGHT ? 'is-highlight' : undefined}>{m}</th>)}
          </tr>
        </thead>
        {results.groups.map((group, g) => (
          <tbody key={g}>
            <tr className="bench-group"><th colSpan={results.models.length + 1} scope="rowgroup">{tr(group)}</th></tr>
            {results.benchmarks.filter(b => b.group === g).map(b => {
              const best = Math.max(...reported(b.scores))
              return (
                <tr key={b.name}>
                  <th scope="row">{b.name}{b.source === 'figure' && <span className="bench-source">{tr(results.fromFigure)}</span>}</th>
                  {b.scores.map((s, i) => <td key={i} className={[i === HIGHLIGHT && 'is-highlight', s === best && 'is-best'].filter(Boolean).join(' ') || undefined}>{s ?? '—'}</td>)}
                </tr>
              )
            })}
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default function Results() {
  const tr = useTr()
  const [view, setView] = useState('chart')
  return (
    <Section id="results" title={results.title} intro={results.intro}>
      <div className="results-bar">
        <h3 className="subhead">{tr(results.chartTitle)}</h3>
        <div className="segmented" role="group" aria-label="View">
          {['chart', 'table'].map(v => (
            <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}>
              {tr(v === 'chart' ? results.viewChart : results.viewTable)}
            </button>
          ))}
        </div>
      </div>
      <ul className="bench-legend" aria-label="Legend">
        <li><span className="swatch is-highlight" />IQuest-Q1</li>
        <li><span className="swatch" />{tr({ en: 'Other models', zh: '其他模型' })}</li>
        <li><span className="swatch-line" />{tr({ en: 'Average of reported models', zh: '已报告模型的平均分' })}</li>
      </ul>
      {view === 'chart'
        ? results.groups.map((group, g) => (
          <div key={g} className="bench-group-block">
            <p className="bench-group-title">{tr(group)}</p>
            <div className="bench-grid">
              {results.benchmarks.filter(b => b.group === g).map(b => <BenchCard key={b.name} bench={b} />)}
            </div>
          </div>
        ))
        : <BenchTable />}
      <p className="fine-print">{tr(results.chartNote)}</p>

      <div className="card-grid cols-2 results-notes">
        <article className="card card-plain">
          <h4>{tr(results.harnessTitle)}</h4>
          <dl className="kv">
            {results.harness.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{tr(v)}</dd></div>)}
          </dl>
        </article>
        <article className="card card-plain">
          <h4>{tr(results.metricsTitle)}</h4>
          <ul className="bullets">{results.metrics.map((m, i) => <li key={i}>{tr(m)}</li>)}</ul>
        </article>
        <article className="card card-plain">
          <h4>{tr(results.cyberTitle)}</h4>
          <p>{tr(results.cyber)}</p>
        </article>
        <article className="card card-plain">
          <h4>{tr(results.safetyTitle)}</h4>
          <p>{tr(results.safety)}</p>
        </article>
      </div>

      <div className="pending">
        <h4>{tr(results.moreTitle)} <span className="pill-muted">{tr(results.pending)}</span></h4>
        <ul className="chips">{results.more.map(name => <li key={name}>{name}</li>)}</ul>
      </div>
    </Section>
  )
}
