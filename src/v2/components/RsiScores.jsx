import { rsiProgress as P } from '../../shared'
import { useTr } from '../../lib/i18n'
import { rsiFigureCopy as C } from '../copy'

/*
 * The RSI figure's second scene: best scores after each iteration of the recorded run. It uses
 * the loop's canvas size so the two scenes can cross-fade in place. Iterations after `from`
 * draw themselves in when the scene is (re)mounted; `focus` carries the value labels.
 */
const GEOMETRY = {
  wide: {
    viewBox: '0 0 960 450', x: [118, 790], y: [372, 112], ticks: [40, 50, 60, 70, 80, 90],
    title: [60, 30], legend: [60, 58], callout: 92, xLabel: 398, axisTitle: 434, point: 5.5, gap: [12, 21],
  },
  compact: {
    // Taller than the loop's compact drawing: that scene also carries the step list below it.
    viewBox: '0 0 360 400', x: [40, 300], y: [330, 86], ticks: [40, 50, 60, 70, 80, 90],
    title: [8, 16], legend: [8, 40], callout: null, xLabel: 350, axisTitle: 378, point: 4.5, gap: [9, 17],
  },
}
const RANGE = [40, 90]
const STEP_MS = 700
const LAST = P.iterations.length - 1

export const iterationDelta = (id, i) => {
  if (i === 0) return null
  const d = P.iterations[i][id] - P.iterations[i - 1][id]
  return Math.abs(d) < 0.005 ? '±0' : `${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(2)}`
}
// Two decimals throughout, as the run reports them, so the values line up as they change.
export const iterationValue = (id, i) => P.iterations[i][id].toFixed(2)

function Marker({ id, cx, cy, r }) {
  return id === 'paperbench'
    ? <circle cx={cx} cy={cy} r={r} />
    : <rect x={cx - r * 0.9} y={cy - r * 0.9} width={r * 1.8} height={r * 1.8} />
}

export default function RsiScores({ compact, upTo, from, focus, runKey, onFocus, onPick }) {
  const tr = useTr()
  const G = compact ? GEOMETRY.compact : GEOMETRY.wide
  const S = C.scores
  const sx = i => G.x[0] + (i * (G.x[1] - G.x[0])) / LAST
  const sy = v => G.y[0] - ((v - RANGE[0]) / (RANGE[1] - RANGE[0])) * (G.y[0] - G.y[1])
  const shown = P.iterations.slice(0, upTo + 1)
  const delay = i => 250 + (i - from - 1) * STEP_MS
  const labelsAt = 250 + Math.max(0, upTo - from) * STEP_MS
  const spacing = (G.x[1] - G.x[0]) / LAST
  const fx = sx(focus)
  const anchor = focus <= 1 ? 'start' : focus >= LAST - 1 ? 'end' : 'middle'

  return (
    <svg viewBox={G.viewBox} role="group" aria-label={tr(S.title)} className="v2-rsi-scores">
      <text x={G.title[0]} y={G.title[1]} className="v2-rsi-scoretitle">{tr(S.title)}</text>
      <g className="v2-rsi-scorelegend" transform={`translate(${G.legend[0]} ${G.legend[1]})`}>
        {P.series.map((s, k) => {
          const x = k * (compact ? 116 : 290)
          return (
            <g key={s.id} className={`is-${s.id}`} transform={`translate(${x} 0)`}>
              <line x1="0" x2="22" y1="-4" y2="-4" className="v2-rsi-seg" />
              <g className="v2-rsi-pt"><Marker id={s.id} cx={11} cy={-4} r={G.point - 1} /></g>
              <text x="30" y="0">{s.name}{!compact && <tspan className="v2-rsi-scorerole"> · {tr(s.role)}</tspan>}</text>
            </g>
          )
        })}
      </g>

      {G.ticks.map(v => (
        <g key={v} className="v2-rsi-tick">
          <line x1={G.x[0] - 8} x2={G.x[1] + 8} y1={sy(v)} y2={sy(v)} />
          <text x={G.x[0] - 14} y={sy(v) + 4} textAnchor="end">{v}</text>
        </g>
      ))}
      {P.iterations.map((_, i) => (
        <text key={i} x={sx(i)} y={G.xLabel} textAnchor="middle" className={`v2-rsi-xlabel${i === focus ? ' is-focus' : ''}${i > upTo ? ' is-future' : ''}`}>
          {i === 0 ? tr(S.start) : i}
        </text>
      ))}
      <text x={(G.x[0] + G.x[1]) / 2} y={G.axisTitle} textAnchor="middle" className="v2-rsi-axistitle">{tr(S.axis)}</text>

      <line x1={fx} x2={fx} y1={G.callout ?? G.y[1] - 18} y2={G.y[0]} className="v2-rsi-guide" />

      <g key={runKey}>
        {P.series.map(s => (
          <g key={s.id} className={`is-${s.id}`}>
            {shown.slice(1).map((it, k) => {
              const i = k + 1
              return (
                <path key={i} d={`M${sx(i - 1)} ${sy(shown[i - 1][s.id])}L${sx(i)} ${sy(it[s.id])}`} pathLength="1"
                  className={`v2-rsi-seg${i > from ? ' is-drawing' : ''}`} style={i > from ? { animationDelay: `${delay(i)}ms` } : undefined} />
              )
            })}
            {shown.map((it, i) => (
              <g key={i} className={`v2-rsi-pt${it.adopted === false ? ' is-kept' : ''}${i === focus ? ' is-focus' : ''}${i > from ? ' is-popping' : ''}`}
                style={i > from ? { animationDelay: `${delay(i) + 450}ms` } : undefined}>
                <Marker id={s.id} cx={sx(i)} cy={sy(it[s.id])} r={G.point + (i === focus ? 1.5 : 0)} />
              </g>
            ))}
          </g>
        ))}

        <g className="v2-rsi-scorelabels" style={{ animationDelay: `${labelsAt}ms` }}>
          {P.series.map((s, k) => {
            const y = sy(P.iterations[focus][s.id]) + (k === 0 ? -G.gap[0] : G.gap[1])
            const delta = iterationDelta(s.id, focus)
            return (
              <text key={s.id} x={fx} y={y} textAnchor={anchor} dx={anchor === 'start' ? -4 : anchor === 'end' ? 4 : 0} className={`v2-rsi-value is-${s.id}`}>
                {iterationValue(s.id, focus)}{delta && <tspan className="v2-rsi-delta"> {delta}</tspan>}
              </text>
            )
          })}
          {G.callout != null && (
            <text x={fx} y={G.callout - 6} textAnchor={anchor} dx={anchor === 'start' ? -10 : anchor === 'end' ? 10 : 0} className="v2-rsi-callout">
              {tr(P.iterations[focus].change)}
            </text>
          )}
        </g>
      </g>

      {shown.map((_, i) => (
        <rect key={i} x={sx(i) - spacing / 2} y={G.y[1] - 24} width={spacing} height={G.y[0] - G.y[1] + 40} className="v2-rsi-hitcol"
          role="button" tabIndex={0} aria-pressed={i === focus}
          aria-label={`${tr(i === 0 ? S.start : S.iteration(i))}: ${P.series.map(s => `${s.name} ${iterationValue(s.id, i)}`).join(', ')}`}
          onMouseEnter={() => onFocus(i)} onFocus={() => onFocus(i)} onClick={() => onPick(i)}
          onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onPick(i) } }} />
      ))}
    </svg>
  )
}
