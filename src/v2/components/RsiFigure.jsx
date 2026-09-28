import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import { rsiLoop as L, rsiProgress as P } from '../../shared'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { useLanguageCode, useTr } from '../../lib/i18n'
import { rsiFigureCopy as C, rsi as RSI, ui } from '../copy'
import { useElementWidth } from '../hooks/useElementWidth'
import Figure from './Figure'
import RsiScores, { iterationDelta, iterationValue } from './RsiScores'

/*
 * Human-on-the-loop RSI, redrawn from Figure 6 of the report. Two ring flywheels meet at the RSI
 * agent; researchers sit above and discuss with the agent (two-way dashed link). The reader
 * steps through an illustrative iteration; nothing moves until they act. A second scene shows
 * the scores the loop reached over the recorded run (RsiScores); the two cross-fade in place.
 *
 * Ring angles are in SVG degrees (0 = right, 90 = down). The capability ring runs from the
 * agent (0°) through steps 1-3 counter-clockwise; the development ring mirrors it from 180°.
 */
const STEP_ANGLES = [[0, 270], [0, 180], [0, 90], [1, 270], [1, 360], [1, 450]]
const RING_START = [360, 180]
const CHEVRONS = [[0, 315], [0, 225], [0, 135], [0, 45], [1, 225], [1, 315], [1, 405], [1, 495]]
const PLAY_MS = 6000
const INTERLUDE_MS = 5500
const FINALE_MS = 2800
const ADOPT = L.steps.findIndex(s => s.bump === 0)
const HARNESS = L.steps.findIndex(s => s.bump === 1)
const LAST_STEP = L.steps.length - 1
const LAST_ITER = P.iterations.length - 1

// What Play shows, in order: the walkthrough's steps; a cut to the scores when its checkpoint is
// adopted; the remaining steps; then the later iterations of the run drawn onto the chart.
const BEATS = [
  ...L.steps.slice(0, ADOPT + 1).map((_, i) => ({ step: i, ms: PLAY_MS })),
  { step: ADOPT, chart: P.illustrated, ms: INTERLUDE_MS },
  ...L.steps.slice(ADOPT + 1).map((_, k) => ({ step: ADOPT + 1 + k, ms: PLAY_MS })),
  ...P.iterations.slice(P.illustrated + 1).map((_, k) => ({ step: LAST_STEP, chart: P.illustrated + 1 + k, ms: FINALE_MS })),
]

const GEOMETRY = {
  wide: {
    viewBox: '0 0 960 450', rings: [[270, 296], [690, 296]], r: 118, node: 12,
    band: { titleY: 16, ruleXs: [252, 480, 708], titleY2: 54, subY: 76, underlineY: 86, hairY: 98, hairX: [150, 810] },
    discuss: { x: 480, y1: 106, y2: 236, bubble: [494, 172] },
    agent: { x: 394, y: 240, w: 172, h: 112 },
  },
  compact: {
    viewBox: '0 0 360 290', rings: [[74, 205], [286, 205]], r: 58, node: 11,
    band: { titleY: 12, ruleXs: [60, 180, 300], titleY2: 36, subY: 51, underlineY: 58, hairY: 66, hairX: [16, 344] },
    discuss: { x: 180, y1: 72, y2: 166, bubble: [190, 122] },
    agent: { x: 132, y: 170, w: 96, h: 70 },
  },
}

const pt = ([cx, cy], r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)]
const arc = (c, r, from, to) => {
  const n = Math.max(2, Math.ceil(Math.abs(to - from) / 4))
  return Array.from({ length: n + 1 }, (_, i) => pt(c, r, from + ((to - from) * i) / n))
    .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('')
}

function StepLabel({ at: [x, y], index, lines, compact, active }) {
  if (compact) return null
  const size = 14
  const lh = 17
  let anchor = 'middle', tx = x, ty
  if (index === 0 || index === 3) ty = y - 22
  else if (index === 2 || index === 5) ty = y + 30
  else if (index === 1) { anchor = 'end'; tx = 132; ty = y - (lines.length - 1) * lh / 2 + 5 }
  else { anchor = 'start'; tx = 828; ty = y - (lines.length - 1) * lh / 2 + 5 }
  return (
    <text className={`v2-rsi-steplabel${active ? ' is-active' : ''}`} textAnchor={anchor} style={{ fontSize: size }}>
      {lines.map((line, i) => <tspan key={i} x={tx} y={ty + i * lh}>{line}</tspan>)}
    </text>
  )
}

export default function RsiFigure({ onWatchRun }) {
  const tr = useTr()
  const language = useLanguageCode()
  const figRef = useRef(null)
  const width = useElementWidth(figRef)
  const compact = width > 0 && width < 820
  const G = compact ? GEOMETRY.compact : GEOMETRY.wide
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const tiny = useMediaQuery('(max-width: 359.98px)') // no room for Play (see styles.css)
  const [step, setStep] = useState(0)
  const [view, setView] = useState('loop')
  const viewRef = useRef(view)
  viewRef.current = view
  // Chart state: iterations shown (0..upTo), those after `from` draw in, `focus` is labelled.
  const [chart, setChart] = useState({ upTo: LAST_ITER, from: LAST_ITER, focus: P.illustrated })
  const [runKey, setRunKey] = useState(0)
  const [beat, setBeat] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [interacted, setInteracted] = useState(false)
  // Play runs to the end unless the reader pauses it or picks a step or iteration; it only
  // holds while the figure is off screen or the tab is hidden.
  const [onScreen, setOnScreen] = useState(true)
  const [hoverRule, setHoverRule] = useState(null)
  const [flashRow, setFlashRow] = useState(null)
  const prevStep = useRef(0)
  const titleRefs = useRef([])
  const [titleWidths, setTitleWidths] = useState([60, 70, 60])

  const last = LAST_STEP
  const select = useCallback(index => {
    setPlaying(false)
    setInteracted(true)
    setView('loop')
    setStep(Math.max(0, Math.min(last, index)))
  }, [last])
  const showChart = useCallback((upTo, from, focus = upTo) => {
    setView('chart')
    setChart({ upTo, from, focus })
    setRunKey(k => k + 1)
  }, [])
  const applyBeat = useCallback(index => {
    const b = BEATS[index]
    // A scene that is cut away becomes inert; keep keyboard focus in the figure, not on <body>.
    const fig = figRef.current
    const leaving = (b.chart == null ? 'loop' : 'chart') !== viewRef.current
    if (leaving && fig && fig !== document.activeElement && fig.contains(document.activeElement)
      && !fig.querySelector('.v2-rsi-controls')?.contains(document.activeElement)) fig.focus({ preventScroll: true })
    setBeat(index)
    setStep(b.step)
    if (b.chart == null) setView('loop')
    else showChart(b.chart, b.chart - 1)
  }, [showChart])
  const focusIteration = i => setChart(c => ({ ...c, focus: Math.max(0, Math.min(c.upTo, i)) }))
  // Hovering the chart previews an iteration, but not while Play is labelling the newest one.
  const previewIteration = i => { if (!playing) focusIteration(i) }
  const pickIteration = i => { setPlaying(false); setInteracted(true); focusIteration(i) }
  const toggleScores = () => {
    setPlaying(false)
    setInteracted(true)
    if (view === 'chart') setView('loop')
    else showChart(LAST_ITER, 0, P.illustrated)
  }


  useEffect(() => {
    const from = prevStep.current
    prevStep.current = step
    if (step === from + 1 && (step === 2 || step === 5)) {
      setFlashRow(step === 2 ? 0 : 1)
      const timer = setTimeout(() => setFlashRow(null), 600)
      return () => clearTimeout(timer)
    }
  }, [step])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.intersectionRatio >= 0.25), { threshold: [0, 0.25, 0.5] })
    observer.observe(figRef.current)
    return () => observer.disconnect()
  }, [])

  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const running = playing && onScreen && !hidden && !reduceMotion
  useEffect(() => {
    if (!running) return
    // The last beat is held for its full time too, so its point finishes drawing before Play ends.
    const timer = setTimeout(() => (beat >= BEATS.length - 1 ? setPlaying(false) : applyBeat(beat + 1)), BEATS[beat].ms)
    return () => clearTimeout(timer)
  }, [running, beat, applyBeat])

  const togglePlay = () => {
    setInteracted(true)
    if (playing) { setPlaying(false); return }
    // From the untouched first step, play it; after the last beat, start over; otherwise move on
    // at once so Play responds.
    const now = view === 'loop'
      ? BEATS.findIndex(b => b.chart == null && b.step === step)
      : BEATS.findIndex(b => b.chart === chart.upTo)
    applyBeat(!interacted && now === 0 ? 0 : now < 0 || now >= BEATS.length - 1 ? 0 : now + 1)
    setPlaying(true)
  }

  // Underline width follows each rule title; re-measured when the layout or language changes
  // and once the web fonts have loaded.
  const measure = useCallback(() => {
    const next = titleRefs.current.map(el => (el ? Math.round(el.getComputedTextLength()) : 60))
    setTitleWidths(prev => (prev.every((w, i) => w === next[i]) ? prev : next))
  }, [])
  useLayoutEffect(measure, [compact, language, measure])
  useEffect(() => {
    const fonts = document.fonts
    if (!fonts) return
    fonts.ready.then(measure)
    fonts.addEventListener?.('loadingdone', measure)
    return () => fonts.removeEventListener?.('loadingdone', measure)
  }, [measure])

  const onKeyDown = event => {
    if (event.target !== figRef.current && !figRef.current.querySelector('.v2-rsi-canvas')?.contains(event.target)) return
    const at = view === 'chart' ? chart.focus : step
    const keys = { ArrowRight: at + 1, ArrowLeft: at - 1, Home: 0, End: view === 'chart' ? chart.upTo : last }
    if (!(event.key in keys)) return
    event.preventDefault()
    if (view === 'chart') pickIteration(keys[event.key])
    else select(keys[event.key])
  }

  const current = L.steps[step]
  // The walkthrough is one iteration of the recorded run, so the agent's versions follow it.
  const versions = [P.illustrated - 1 + (step >= ADOPT ? 1 : 0), P.illustrated - 1 + (step >= HARNESS ? 1 : 0)]
  const iterName = i => tr(i === 0 ? C.scores.start : C.scores.iteration(i))
  const scoreParts = i => P.series.map(s => {
    const delta = iterationDelta(s.id, i)
    return `${s.name} ${iterationValue(s.id, i)}${delta ? ` (${delta})` : ''}`
  })
  const gated = hoverRule != null ? L.ruleSteps[hoverRule] : []
  const nodes = STEP_ANGLES.map(([ring, angle]) => ({ ring, pos: pt(G.rings[ring], G.r, angle) }))
  const [activeRing, activeAngle] = STEP_ANGLES[step]
  const stepLines = i => C.stepNames[i].map(tr)
  const stepName = i => stepLines(i).join(tr({ en: ' ', zh: '' }))
  const ruleActive = current.rule != null
  const { band: B, discuss: D, agent: A } = G

  return (
    <Figure id="rsi-figure" className="v2-rsi" tabIndex={0} aria-label={tr(C.lead)}
      caption={{ lead: C.lead, text: [C.caption, reduceMotion || tiny ? C.hint.still : C.hint.play, L.note, C.scores.source]
        .reduce((all, part) => ({ en: `${all.en} ${part.en}`, zh: `${all.zh}${part.zh}` })) }}
      onKeyDown={onKeyDown}
      ref={figRef}>
      <div className={`v2-rsi-canvas${compact ? ' is-compact' : ''}${interacted ? ' is-interacted' : ''}`}>
        <div className={`v2-rsi-scene is-loop${view === 'loop' ? ' is-shown' : ''}`} aria-hidden={view !== 'loop'} inert={view === 'loop' ? undefined : ''}>
        <svg viewBox={G.viewBox} role="group" aria-label={tr(L.supervision)}>
          <defs>
            <marker id="v2-rsi-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </marker>
          </defs>

          {/* researchers and the three supervision rules */}
          <g className="v2-rsi-band">
            <g transform={`translate(${compact ? 180 : 480} ${B.titleY})`}>
              <text className="v2-rsi-bandtitle" textAnchor="middle" y="4">{compact ? tr(L.researchers) : tr(C.researchersBand)}</text>
            </g>
            {L.rules.map((rule, i) => {
              const x = B.ruleXs[i]
              const active = current.rule === i
              return (
                <g key={i} className={`v2-rsi-rule${active ? ' is-active' : ''}${hoverRule === i ? ' is-hover' : ''}`}
                  role="button" tabIndex={0} aria-pressed={active} aria-label={tr(rule.full)}
                  onClick={() => select(L.ruleSteps[i][0])}
                  onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(L.ruleSteps[i][0]) } }}
                  onMouseEnter={() => setHoverRule(i)} onMouseLeave={() => setHoverRule(null)}
                  onFocus={() => setHoverRule(i)} onBlur={() => setHoverRule(null)}>
                  <rect x={x - (compact ? 56 : 100)} y={B.titleY + 12} width={compact ? 112 : 200} height={B.hairY - B.titleY - 14} rx="4" className="v2-rsi-rulefocus" />
                  <text ref={el => { titleRefs.current[i] = el }} x={x} y={B.titleY2} textAnchor="middle" className="v2-rsi-ruletitle">{tr(rule.title)}</text>
                  <text x={x} y={B.subY} textAnchor="middle" className="v2-rsi-rulesub">{tr(rule.sub)}</text>
                  {active && <rect x={x - titleWidths[i] / 2} y={B.underlineY} width={titleWidths[i]} height="3" className="v2-rsi-underline" />}
                </g>
              )
            })}
            <line x1={B.hairX[0]} x2={B.hairX[1]} y1={B.hairY} y2={B.hairY} className="v2-rsi-hair" />
          </g>

          {/* the two-way discussion between researchers and the agent */}
          <g className={`v2-rsi-discuss${ruleActive ? ' is-active' : ''}${ruleActive && interacted ? ' is-live' : ''}`}>
            <line x1={D.x} x2={D.x} y1={D.y1} y2={D.y2} markerStart="url(#v2-rsi-arrow)" markerEnd="url(#v2-rsi-arrow)" />
            <g transform={`translate(${D.bubble[0]} ${D.bubble[1]})`} className="v2-rsi-bubble">
              {!compact && <>
                <path d="M0 -14 h22 a5 5 0 0 1 5 5 v9 a5 5 0 0 1 -5 5 h-14 l-5 5 v-5 h-3 a5 5 0 0 1 -5 -5 v-9 a5 5 0 0 1 5 -5z" className="is-agent" />
                <path d="M12 -6 h22 a5 5 0 0 1 5 5 v9 a5 5 0 0 1 -5 5 h-3 v5 l-5 -5 h-14 a5 5 0 0 1 -5 -5 v-9 a5 5 0 0 1 5 -5z" className="is-human" />
              </>}
              <text x={compact ? 0 : 46} y={compact ? 4 : 6} className="v2-rsi-discusslabel">{tr(L.discuss)}</text>
            </g>
          </g>

          {/* flywheels */}
          {G.rings.map((c, i) => (
            <g key={i} className={`v2-rsi-ring ring-${i}`}>
              <circle cx={c[0]} cy={c[1]} r={G.r} className="v2-rsi-track" />
              {compact
                ? <text x={c[0]} y={c[1] - 3} textAnchor="middle" className="v2-rsi-ringtitle is-compact">
                    <tspan x={c[0]}>{tr(L.lobes[i].short[0])}</tspan>
                    <tspan x={c[0]} dy="14">{tr(L.lobes[i].short[1])}</tspan>
                  </text>
                : <>
                    <text x={c[0]} y={c[1] - 4} textAnchor="middle" className="v2-rsi-ringtitle">{tr(L.lobes[i].title)}</text>
                    <text x={c[0]} y={c[1] + 18} textAnchor="middle" className="v2-rsi-ringsub">{tr(C.ringSub[i])}</text>
                  </>}
            </g>
          ))}
          {CHEVRONS.map(([ring, angle], i) => {
            const [x, y] = pt(G.rings[ring], G.r, angle)
            const rad = (angle * Math.PI) / 180
            const dir = ring === 0 ? [Math.sin(rad), -Math.cos(rad)] : [-Math.sin(rad), Math.cos(rad)]
            const rot = (Math.atan2(dir[1], dir[0]) * 180) / Math.PI
            return <path key={i} d="M-3 -4 L2 0 L-3 4" transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})`} className="v2-rsi-chevron" />
          })}
          <path key={`arc-${step}-${compact}`} d={arc(G.rings[activeRing], G.r, RING_START[activeRing], activeAngle)} pathLength="1"
            className={`v2-rsi-arc ring-${activeRing}`} />

          {nodes.map((n, i) => (
            <g key={i} className={`v2-rsi-node ring-${n.ring}${i === step ? ' is-active' : ''}${gated.includes(i) ? ' is-gated' : ''}`}
              role="button" tabIndex={0} aria-pressed={i === step}
              aria-label={tr(C.stepOf(i + 1, L.steps.length)) + stepName(i)}
              onClick={() => select(i)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(i) } }}>
              <circle cx={n.pos[0]} cy={n.pos[1]} r={G.node + 8} className="v2-rsi-hit" />
              <circle cx={n.pos[0]} cy={n.pos[1]} r={G.node + 4} className="v2-rsi-halo" />
              <circle cx={n.pos[0]} cy={n.pos[1]} r={G.node} className="v2-rsi-dot" />
              <text x={n.pos[0]} y={n.pos[1] + 4} textAnchor="middle" className="v2-rsi-num">{i + 1}</text>
              <StepLabel at={n.pos} index={i} lines={stepLines(i)} compact={compact} active={i === step} />
            </g>
          ))}

          {/* the RSI agent: latest accepted model + development harness */}
          <g className="v2-rsi-agent">
            <rect x={A.x} y={A.y} width={A.w} height={A.h} rx={compact ? 7 : 10} className="v2-rsi-agentbox" />
            <image href={logo} x={A.x + (compact ? 8 : 18)} y={A.y + (compact ? 8 : 14)} width={compact ? 11 : 16} height={compact ? 11 : 16} />
            <text x={A.x + (compact ? 23 : 40)} y={A.y + (compact ? 17 : 27)} className={`v2-rsi-agenttitle${compact ? ' is-compact' : ''}`}>{tr(L.agent)}</text>
            {[L.model, L.harness].map((name, i) => {
              const rw = compact ? 80 : 136, rh = compact ? 18 : 26
              const rx = A.x + (A.w - rw) / 2, ry = A.y + (compact ? 25 : 42) + i * (rh + (compact ? 4 : 8))
              return (
                <g key={i} className={`v2-rsi-row ring-${i}${flashRow === i ? ' is-flash' : ''}`}>
                  <rect x={rx} y={ry} width={rw} height={rh} className="v2-rsi-rowbg" />
                  <rect x={rx} y={ry} width="3" height={rh} className="v2-rsi-rowbar" />
                  <text x={rx + (compact ? 8 : 12)} y={ry + rh / 2 + (compact ? 3.5 : 4.5)} className={`v2-rsi-rowtext${compact ? ' is-compact' : ''}`}>{tr(name)} <tspan className="v2-rsi-rowv">v{versions[i]}</tspan></text>
                </g>
              )
            })}
          </g>
        </svg>

        {compact && (
          <div className="v2-rsi-legend">
            {[0, 1].map(ring => (
              <ol key={ring} className={`ring-${ring}`} start={ring * 3 + 1}>
                <li className="v2-rsi-legendtitle">{tr(C.legend[ring])}</li>
                {L.steps.slice(ring * 3, ring * 3 + 3).map((_, k) => {
                  const i = ring * 3 + k
                  return (
                    <li key={i}>
                      <button type="button" aria-pressed={i === step} onClick={() => select(i)}>
                        <span className="v2-rsi-legendnum">{i + 1}</span>{stepName(i)}
                      </button>
                    </li>
                  )
                })}
              </ol>
            ))}
          </div>
        )}
        </div>
        <div className={`v2-rsi-scene is-chart${view === 'chart' ? ' is-shown' : ''}`} aria-hidden={view !== 'chart'} inert={view === 'chart' ? undefined : ''}>
          <RsiScores compact={compact} upTo={chart.upTo} from={view === 'chart' ? chart.from : chart.upTo} focus={chart.focus}
            runKey={runKey} onFocus={previewIteration} onPick={pickIteration} />
        </div>
      </div>

      <div className="v2-rsi-controls">
        <div className="v2-rsi-buttons">
          {view === 'loop' ? <>
            <button type="button" className="v2-roundbtn" onClick={() => select(step - 1)} aria-label={tr(L.prev)} disabled={step === 0}>‹</button>
            <button type="button" className="v2-roundbtn" onClick={() => select(step + 1)} aria-label={tr(L.next)} disabled={step === last}>›</button>
          </> : <>
            <button type="button" className="v2-roundbtn" onClick={() => pickIteration(chart.focus - 1)} aria-label={tr(C.scores.prev)} disabled={chart.focus === 0}>‹</button>
            <button type="button" className="v2-roundbtn" onClick={() => pickIteration(chart.focus + 1)} aria-label={tr(C.scores.next)} disabled={chart.focus === chart.upTo}>›</button>
          </>}
          {!reduceMotion && (
            <button type="button" className="v2-textbtn v2-rsi-play" onClick={togglePlay}>
              {playing ? `❚❚ ${tr(L.pause)}` : `▶ ${tr(L.play)}`}
            </button>
          )}
          <span className="v2-rsi-stepbtns" role="group" aria-label={tr(L.stepLabel)}>
            {L.steps.map((_, i) => (
              <button key={i} type="button" className={`ring-${STEP_ANGLES[i][0]}`} aria-pressed={view === 'loop' && i === step} aria-label={stepName(i)} onClick={() => select(i)}>{i + 1}</button>
            ))}
          </span>
          <button type="button" className="v2-rsi-scorebtn" aria-pressed={view === 'chart'} onClick={toggleScores}>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 13.5 5.5 9l3 2 6-7.5" /></svg>{tr(C.scores.button)}
          </button>
        </div>
        {view === 'loop' ? (
          <p className="v2-rsi-status">
            <span className="v2-rsi-stepname">{stepName(step)}</span>
            {ruleActive && <span className="v2-rsi-rulename"><span aria-hidden="true">●</span> {tr(L.rules[current.rule].full)}</span>}
            {current.event && (
              <span className={`v2-rsi-event ring-${current.bump}`}>✓ {tr(current.event)} → {tr(current.bump === 0 ? L.model : L.harness)} v{versions[current.bump]}</span>
            )}
          </p>
        ) : (
          <p className="v2-rsi-status">
            <span className="v2-rsi-stepname">{iterName(chart.focus)}</span>
            <span>{tr(P.iterations[chart.focus].change)}</span>
            {scoreParts(chart.focus).map((text, k) => <span key={k} className={`v2-rsi-scorepart is-${P.series[k].id}`}>{text}</span>)}
            {chart.focus === P.illustrated && <span className="v2-rsi-tag">{tr(C.scores.walkthrough)}</span>}
          </p>
        )}
      </div>

      <div className="v2-rsi-transcripts">
        {L.steps.map((s, i) => {
          const on = view === 'loop' && i === step
          return (
          <div key={i} className={`v2-rsi-transcript${on ? ' is-active' : ''}`} aria-hidden={!on} inert={on ? undefined : ''}>
            {s.messages.map(([who, text], k) => (
              <div key={k} className={`v2-rsi-msg is-${who}`}>
                <p className="v2-rsi-who">{tr(who === 'agent' ? L.agentName : L.humanName)}</p>
                <p>{tr(text)}</p>
              </div>
            ))}
          </div>
          )
        })}
        <div className={`v2-rsi-transcript is-note${view === 'chart' ? ' is-active' : ''}`} aria-hidden={view !== 'chart'} inert={view === 'chart' ? undefined : ''}>
          <p>{tr(C.scores.note)}</p>
          {onWatchRun && <p><a className="v2-link v2-crosslink" href="#rd-figure" onClick={event => { event.preventDefault(); onWatchRun() }}>{tr(RSI.watchRun)}</a></p>}
        </div>
      </div>
      <p className="v2-sr" aria-live="polite">
        {view === 'loop'
          // Messages end with their own full stop, so they are joined with a plain gap.
          ? [[stepName(step), ruleActive ? tr(L.rules[current.rule].full) : null].filter(Boolean).join(tr(ui.stop)) + tr(ui.stop).trimEnd(),
            ...current.messages.map(([, text]) => tr(text))].join(tr(ui.gap))
          : [iterName(chart.focus), tr(P.iterations[chart.focus].change), ...scoreParts(chart.focus)].join(tr(ui.stop))}
      </p>
    </Figure>
  )
}
