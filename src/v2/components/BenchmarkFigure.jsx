import { Fragment, useEffect, useState } from 'react'
import { benchmarks as B, formatScore, reportedScores } from '../../shared'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { useTr } from '../../lib/i18n'
import { results as R } from '../copy'
import { EVAL_EXPORTS, EVAL_PHONE_DEFAULT, EVAL_VIEWS } from '../config'
import CopyButton from './CopyButton'
import Figure from './Figure'

const VIEW_KEY = 'iquest.v2.benchView'
const TICKS = [0, 25, 50, 75, 100]
const HL = B.highlight
const BAR_MAX = 72 // px for a score of 100

// Markdown table of the same rows, for pasting into docs and slides.
function toMarkdown(tr) {
  const head = `| ${tr(R.benchmark)} | ${B.models.join(' | ')} |`
  const sep = `|${' --- |'.repeat(B.models.length + 1)}`
  const rows = B.rows.map(row => {
    const name = row.source === 'figure' ? `${row.name} (${tr(B.sourceLabel.report)})` : row.name
    return `| ${name} | ${row.scores.map(formatScore).join(' | ')} |`
  })
  return [head, sep, ...rows, '', tr(B.sourceNote)].join('\n')
}

function SourceTag() {
  const tr = useTr()
  return <span className="v2-srctag">{tr(B.sourceLabel.report)}</span>
}

function DotRow({ row, selected, touch, expanded, onToggle }) {
  const [tip, setTip] = useState(false)
  const reported = reportedScores(row.scores)
  const min = Math.min(...reported), max = Math.max(...reported)
  const compared = B.models.map((m, i) => i).filter(i => row.scores[i] != null)
  const values = (
    <ul className="v2-dot-values">
      {compared.map(i => (
        <li key={i} className={i === HL ? 'is-hl' : undefined}><span>{B.models[i]}</span><b className="v2-num">{formatScore(row.scores[i])}</b></li>
      ))}
    </ul>
  )
  const label = `${row.name}: ${compared.map(i => `${B.models[i]} ${formatScore(row.scores[i])}`).join(', ')}`
  return (
    <div className={`v2-dot-row${expanded ? ' is-expanded' : ''}`} role="row" tabIndex={0} aria-label={label}
      onMouseEnter={() => !touch && setTip(true)} onMouseLeave={() => setTip(false)}
      onFocus={() => !touch && setTip(true)} onBlur={() => setTip(false)}
      onClick={() => touch && onToggle()} onKeyDown={event => { if (event.key === 'Enter') onToggle() }}>
      <span className="v2-dot-name" role="rowheader">{row.name}{row.source === 'figure' && <SourceTag />}</span>
      <span className="v2-dot-track" role="cell">
        <span className="v2-dot-range" style={{ left: `${min}%`, width: `${max - min}%` }} />
        {row.scores.map((s, i) => (s == null || i === HL ? null : (
          <span key={i} className={`v2-dot-mark${selected === i ? ' is-selected' : ''}${selected != null && selected !== i ? ' is-faded' : ''}`} style={{ left: `${s}%` }}>
            {selected === i && <span className="v2-dot-marklabel v2-num">{formatScore(s)}</span>}
          </span>
        )))}
        {row.scores[HL] != null && <span className="v2-dot-mark is-hl" style={{ left: `${row.scores[HL]}%` }} />}
        {tip && <span className="v2-tip" role="tooltip">{values}</span>}
      </span>
      <span className="v2-dot-value v2-num" role="cell">{formatScore(row.scores[HL])}</span>
      {expanded && <div className="v2-dot-expand">{values}</div>}
    </div>
  )
}

function DotPlot() {
  const tr = useTr()
  const touch = useMediaQuery('(pointer: coarse)')
  const [selected, setSelected] = useState(null)
  const [expanded, setExpanded] = useState(null)
  return (
    <div className={`v2-dot${selected != null ? ' has-selection' : ''}`}>
      <div className="v2-dot-legend">
        <span className="v2-dot-key is-hl"><span className="v2-dot-sw is-hl" />{B.models[HL]}</span>
        {B.models.map((m, i) => (i === HL ? null : (
          <button key={m} type="button" className="v2-dot-key" aria-pressed={selected === i} title={tr(R.legendHint)} onClick={() => setSelected(selected === i ? null : i)}>
            <span className="v2-dot-sw" />{m}
          </button>
        )))}
      </div>
      <div role="table" aria-label={tr(R.figureTitle)}>
      <div className="v2-dot-axis" aria-hidden="true">
        <span />
        <span className="v2-dot-track">{TICKS.map(v => <span key={v} className="v2-dot-tick" style={{ left: `${v}%` }}>{v}</span>)}</span>
        <span className="v2-dot-valuehead">{B.models[HL]}</span>
      </div>
      {B.groups.map((group, g) => (
        <Fragment key={g}>
          <div className="v2-dot-group" role="row"><span role="rowheader" className="v2-label">{tr(group)}</span></div>
          {B.rows.filter(r => r.group === g).map(row => (
            <DotRow key={row.name} row={row} selected={selected} touch={touch}
              expanded={expanded === row.name} onToggle={() => setExpanded(expanded === row.name ? null : row.name)} />
          ))}
        </Fragment>
      ))}
      </div>
    </div>
  )
}

// Small multiples in the style of v1: one panel per benchmark, models sorted by score,
// IQuest-Q1 highlighted.
function BarPanel({ row }) {
  const [hover, setHover] = useState(null)
  const order = row.scores.map((score, model) => ({ score, model })).filter(({ score }) => score != null)
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1) || (a.model === HL ? -1 : 1))
  return (
    <figure className="v2-barpanel" onMouseLeave={() => setHover(null)}>
      <figcaption className="v2-barpanel-head">{row.name}{row.source === 'figure' && <SourceTag />}</figcaption>
      <div className="v2-barpanel-plot">
        {order.map(({ score, model }) => {
          const name = B.models[model]
          return (
            <div key={model} className={`v2-barpanel-row${model === HL ? ' is-hl' : ''}${score == null ? ' is-missing' : ''}`}
              tabIndex={0} aria-label={`${name}: ${formatScore(score)}`}
              onMouseEnter={() => setHover(model)} onFocus={() => setHover(model)} onBlur={() => setHover(null)}>
              <span className="v2-barpanel-name" title={name}>{B.shortModels[model]}</span>
              <span className="v2-barpanel-track">
                {score != null && <span className="v2-barpanel-bar" style={{ width: `${score}%` }} />}
                <span className="v2-barpanel-value v2-num" style={{ left: `${score ?? 0}%` }}>{formatScore(score)}</span>
              </span>
              {hover === model && score != null && (
                <span className="v2-tip v2-barpanel-tip" role="tooltip">
                  <b>{name}</b> <span className="v2-num">{formatScore(score)}</span>
                </span>
              )}
            </div>
          )
        })}
      </div>
    </figure>
  )
}

function BarsView() {
  const tr = useTr()
  return (
    <div className="v2-bars">
      <div className="v2-dot-legend">
        <span className="v2-dot-key is-hl"><span className="v2-bars-sw is-hl" />{B.models[HL]}</span>
        <span className="v2-dot-key"><span className="v2-bars-sw" />{tr(R.otherModels)}</span>
      </div>
      {/* One grid for all benchmarks: two per row fills every row (no gaps between groups). */}
      <div className="v2-bars-grid">
        {B.rows.map(row => <BarPanel key={row.name} row={row} />)}
      </div>
    </div>
  )
}

function BarTable() {
  const tr = useTr()
  const narrow = useMediaQuery('(max-width: 719.98px)')
  return (
    <div className="v2-bartable-wrap">
      <div className="v2-bartable-frame"><div className="v2-bartable-scroll">
        <table className="v2-bartable">
          <caption className="v2-sr">{tr(R.figureTitle)}</caption>
          <thead>
            <tr>
              <th scope="col">{tr(R.benchmark)}</th>
              {B.models.map((m, i) => (
                <th key={m} scope="col" className={i === HL ? 'is-hl' : undefined}>
                  {narrow && B.shortModels[i] !== m ? <abbr title={m}>{B.shortModels[i]}</abbr> : (narrow ? B.shortModels[i] : m)}
                </th>
              ))}
            </tr>
          </thead>
          {B.groups.map((group, g) => (
            <tbody key={g}>
              <tr className="v2-bartable-group"><th scope="rowgroup" colSpan={B.models.length + 1}>{tr(group)}</th></tr>
              {B.rows.filter(r => r.group === g).map(row => (
                <tr key={row.name}>
                  <th scope="row">{row.name}{row.source === 'figure' && <SourceTag />}</th>
                  {row.scores.map((s, i) => (
                    <td key={i} className={i === HL ? 'is-hl' : undefined}>
                      <span className="v2-bartable-v v2-num">{formatScore(s)}</span>
                      {s != null && <span className="v2-bartable-bar" style={{ width: `${((s / 100) * BAR_MAX).toFixed(1)}px` }} aria-hidden="true" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div></div>
      {narrow && (
        <p className="v2-bartable-key">
          <span>{tr(R.modelKey)}</span>
          {B.shortModels.map((s, i) => (s !== B.models[i] ? <span key={s}>{s} = {B.models[i]}</span> : null))}
        </p>
      )}
    </div>
  )
}

export default function BenchmarkFigure() {
  const tr = useTr()
  const narrow = useMediaQuery('(max-width: 719.98px)')
  const [view, setView] = useState(() => {
    try {
      const saved = sessionStorage.getItem(VIEW_KEY)
      return EVAL_VIEWS.includes(saved) ? saved : null
    } catch { return null }
  })
  const current = view ?? (narrow ? EVAL_PHONE_DEFAULT : EVAL_VIEWS[0])
  useEffect(() => {
    if (!view) return
    try { sessionStorage.setItem(VIEW_KEY, view) } catch { /* optional */ }
  }, [view])

  const switcher = EVAL_VIEWS.length > 1 && (
    <div className="v2-switch" role="group" aria-label={tr(R.viewsLabel)}>
      {EVAL_VIEWS.map(v => (
        <button key={v} type="button" aria-pressed={current === v} onClick={() => setView(v)}>{tr(R.views[v])}</button>
      ))}
    </div>
  )
  const View = { bars: BarsView, dots: DotPlot, table: BarTable }[current]
  return (
    <Figure id="results-figure" rule title={R.figureTitle} actions={switcher} className="v2-bench">
      <View />
      <div className="v2-bench-foot">
        <p>{tr(B.sourceNote)}</p>
        {(EVAL_EXPORTS.markdown || EVAL_EXPORTS.json) && (
          <p className="v2-bench-actions">
            {EVAL_EXPORTS.markdown && <CopyButton getText={() => toMarkdown(tr)} label={R.copyMarkdown} />}
            {EVAL_EXPORTS.json && import.meta.env.PROD && <a className="v2-link" href="./data/iquest-q1.json" download="iquest-q1.json">{tr(R.downloadJson)}</a>}
          </p>
        )}
      </div>
    </Figure>
  )
}
