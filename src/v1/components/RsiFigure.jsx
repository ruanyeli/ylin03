import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import { rsiFigure as F } from '../data/content'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { useLanguageCode, useTr } from '../../lib/i18n'

/*
 * Hero figure: human-on-the-loop RSI (redrawn from Figure 3 of the technical report).
 * Two ring flywheels meet at the RSI agent; researchers supervise from above and discuss
 * each stage with the agent. A step tour moves a pulse around the rings and shows an
 * illustrative dialogue beside the diagram.
 *
 * Angles are authored for the landscape layout (0° = right, 90° = down). The capability
 * ring runs counter-clockwise from the agent at 360°, the development ring clockwise from
 * the agent at 180°. The portrait layout stacks the rings and rotates every angle by 90°.
 */

const STEP_ANGLES = [[0, 270], [0, 180], [0, 90], [1, 270], [1, 360], [1, 450]]
const LEGS = [
  [[1, 450, 540], [0, 360, 270]],
  [[0, 270, 180]],
  [[0, 180, 90]],
  [[0, 90, 0], [1, 180, 270]],
  [[1, 270, 360]],
  [[1, 360, 450]],
]
const RING_START = [360, 180]
const CHEVRONS = [[0, 315], [0, 225], [0, 135], [0, 45], [1, 225], [1, 315], [1, 405], [1, 495]]
const RULE_STEPS = [[0, 3], [1], [2, 5]]
const STEP_MS = 5600
const LEG_MS = 1500

const LANDSCAPE = {
  viewBox: '0 0 880 596', offset: 0,
  rings: [{ cx: 250, cy: 392, r: 122 }, { cx: 630, cy: 392, r: 122 }],
  agent: { cx: 440, cy: 392, w: 178, h: 132 },
  panel: { x: 118, y: 12, w: 644, h: 136 },
  chips: { xs: [233, 440, 647], y: 62, w: 190, h: 60 },
  font: { label: 15, lobe: 15.5, lobeSub: 12.5, chip: 14.5, chipSub: 11.5, agent: 15, pill: 13, head: 12.5, node: 14 },
  node: 17,
}
const PORTRAIT = {
  viewBox: '0 0 600 1010', offset: 90,
  rings: [{ cx: 300, cy: 418, r: 128 }, { cx: 300, cy: 802, r: 128 }],
  agent: { cx: 300, cy: 610, w: 236, h: 150 },
  panel: { x: 14, y: 12, w: 572, h: 176 },
  chips: { xs: [108, 300, 492], y: 74, w: 178, h: 80 },
  font: { label: 25, lobe: 23, lobeSub: 18, chip: 22, chipSub: 16, agent: 22, pill: 19, head: 18, node: 20 },
  node: 22,
}

const point = (ring, angle) => {
  const a = (angle * Math.PI) / 180
  return [ring.cx + ring.r * Math.cos(a), ring.cy + ring.r * Math.sin(a)]
}
const arcPath = (ring, a0, a1) => {
  const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / 3))
  let d = ''
  for (let i = 0; i <= n; i++) {
    const [x, y] = point(ring, a0 + ((a1 - a0) * i) / n)
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}
const ease = x => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2)

function StepLabel({ at: [x, y], angle, lines, size }) {
  const a = ((angle % 360) + 360) % 360
  const gap = size * 1.75
  const side = a === 0 ? 'right' : a === 90 ? 'down' : a === 180 ? 'left' : 'up'
  const anchor = side === 'left' ? 'end' : side === 'right' ? 'start' : 'middle'
  const tx = side === 'left' ? x - gap : side === 'right' ? x + gap : x
  const lineH = size * 1.2
  const block = lines.length * lineH
  const first = side === 'up' ? y - gap - block + size : side === 'down' ? y + gap + size * 0.85 : y - block / 2 + size * 0.85
  return <text className="rsi-label" textAnchor={anchor} style={{ fontSize: size }}>
    {lines.map((line, i) => <tspan key={i} x={tx} y={first + i * lineH}>{line}</tspan>)}
  </text>
}

export default function RsiFigure() {
  const tr = useTr()
  const zh = useLanguageCode() === 'zh'
  const portrait = useMediaQuery('(max-width: 760px)')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const G = portrait ? PORTRAIT : LANDSCAPE
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [visible, setVisible] = useState(true)
  const [versions, setVersions] = useState([3, 2])
  const [hoverRule, setHoverRule] = useState(null)
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const fillRefs = [useRef(null), useRef(null)]
  const prevStep = useRef(step)

  const rings = G.rings
  const at = useCallback((ringIndex, angle) => point(rings[ringIndex], angle + G.offset), [rings, G.offset])
  const nodes = useMemo(() => STEP_ANGLES.map(([ring, angle]) => ({ ring, angle: angle + G.offset, pos: point(rings[ring], angle + G.offset) })), [rings, G.offset])

  // Draws the pulse at a position along a list of arc segments and fills the ring it is on.
  const paint = useCallback((ringIndex, angle) => {
    const [x, y] = at(ringIndex, angle)
    dotRef.current?.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`)
    dotRef.current?.setAttribute('class', `rsi-pulse ring-${ringIndex}`)
    fillRefs.forEach((ref, i) => {
      const el = ref.current
      if (!el) return
      if (i === ringIndex) {
        el.setAttribute('d', arcPath(rings[i], RING_START[i] + G.offset, angle + G.offset))
        el.style.opacity = '1'
      } else {
        el.style.opacity = '0'
      }
    })
  }, [at, rings, G.offset])

  // Animate the pulse along the leg that leads into the current step.
  useEffect(() => {
    const from = prevStep.current
    prevStep.current = step
    const forward = (from + 1) % 6 === step
    if (forward && step === 2) setVersions(v => [v[0] >= 9 ? 1 : v[0] + 1, v[1]])
    if (forward && step === 5) setVersions(v => [v[0], v[1] >= 9 ? 1 : v[1] + 1])
    const [ring, angle] = STEP_ANGLES[step]
    if (!forward || reduceMotion) { paint(ring, angle); return }
    const legs = LEGS[step]
    const total = legs.reduce((sum, [, a, b]) => sum + Math.abs(b - a), 0)
    let raf = 0
    const start = performance.now()
    const tick = now => {
      let travelled = ease(Math.min(1, (now - start) / LEG_MS)) * total
      for (const [r, a, b] of legs) {
        const span = Math.abs(b - a)
        if (travelled <= span) { paint(r, a + Math.sign(b - a) * travelled); break }
        travelled -= span
      }
      if (now - start < LEG_MS) raf = requestAnimationFrame(tick)
      else paint(ring, angle)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [step, paint, reduceMotion])

  // Repaint when the layout changes (e.g. rotating into portrait).
  useEffect(() => { const [r, a] = STEP_ANGLES[prevStep.current]; paint(r, a) }, [paint])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 })
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [])

  const autoplay = playing && visible && !reduceMotion
  useEffect(() => {
    if (!autoplay) return
    const timer = setTimeout(() => setStep(s => (s + 1) % 6), STEP_MS)
    return () => clearTimeout(timer)
  }, [autoplay, step])

  const goTo = index => { setPlaying(false); setStep(((index % 6) + 6) % 6) }
  const current = F.steps[step]
  const gated = hoverRule != null ? RULE_STEPS[hoverRule] : []
  const { agent: A, panel: P, chips: C, font: S } = G
  const lines = s => (portrait && s.short ? s.short : s.label).map(tr)
  const fullName = s => s.label.map(tr).join(zh ? '' : ' ')

  const chevrons = CHEVRONS.map(([ring, angle]) => {
    const a = angle + G.offset
    const [x, y] = point(rings[ring], a)
    const rad = (a * Math.PI) / 180
    const dir = ring === 0 ? [Math.sin(rad), -Math.cos(rad)] : [-Math.sin(rad), Math.cos(rad)]
    return { x, y, rot: (Math.atan2(dir[1], dir[0]) * 180) / Math.PI, ring }
  })
  const discussPath = portrait
    ? `M${P.x + 24} ${P.y + P.h + 4} V${A.cy} H${A.cx - A.w / 2 - 6}`
    : `M${A.cx} ${P.y + P.h + 4} V${A.cy - A.h / 2 - 6}`
  const bubbleAt = portrait ? [(P.x + 24 + A.cx - A.w / 2) / 2, A.cy] : [A.cx, (P.y + P.h + A.cy - A.h / 2) / 2]

  return (
    <div className="rsi-figure" ref={rootRef}>
      <div className="rsi-canvas">
        <svg viewBox={G.viewBox} role="img" aria-label={tr(F.supervision)}>
          <defs>
            <linearGradient id="rsi-g0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3b82e0" /><stop offset="1" stopColor="#003b82" /></linearGradient>
            <linearGradient id="rsi-g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#35cdf5" /><stop offset="1" stopColor="#0284c7" /></linearGradient>
            <linearGradient id="rsi-stripe" x1="0" x2="1"><stop offset="0" stopColor="#003b82" /><stop offset="1" stopColor="#00afec" /></linearGradient>
            <filter id="rsi-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0b1a33" floodOpacity=".12" /></filter>
            <filter id="rsi-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
            <marker id="rsi-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9 Z" fill="#f47a2a" /></marker>
          </defs>

          {/* researchers and the three supervision rules */}
          <g className="rsi-panel">
            <rect x={P.x} y={P.y} width={P.w} height={P.h} rx="18" />
            <g transform={`translate(${P.x + 22} ${P.y + 22})`} className="rsi-people">
              {[0, 1].map(i => <g key={i} transform={`translate(${i * 14} 0)`}><circle cx="0" cy="-3" r="5" /><path d="M-8 9 q8 -10 16 0" /></g>)}
            </g>
            <text x={P.x + 52} y={P.y + 28} className="rsi-panel-title" style={{ fontSize: S.head }}>{tr(F.researchers)} · {tr(F.supervision)}</text>
            {F.rules.map((rule, i) => {
              const active = current.rule === i
              return (
                <g key={i} className={`rsi-chip${active ? ' is-active' : ''}${hoverRule === i ? ' is-hover' : ''}`}
                  onMouseEnter={() => setHoverRule(i)} onMouseLeave={() => setHoverRule(null)}>
                  <rect x={C.xs[i] - C.w / 2} y={C.y} width={C.w} height={C.h} rx="12" />
                  <text x={C.xs[i]} y={C.y + C.h * 0.44} textAnchor="middle" className="rsi-chip-title" style={{ fontSize: S.chip }}>{tr(rule.title)}</text>
                  <text x={C.xs[i]} y={C.y + C.h * 0.44 + S.chipSub * 1.35} textAnchor="middle" className="rsi-chip-sub" style={{ fontSize: S.chipSub }}>{tr(rule.sub)}</text>
                </g>
              )
            })}
          </g>
          <path d={discussPath} className={`rsi-discuss${current.rule != null ? ' is-live' : ''}`} markerStart="url(#rsi-arrow)" markerEnd="url(#rsi-arrow)" />
          <g className="rsi-bubble" transform={`translate(${bubbleAt[0]} ${bubbleAt[1]})`}>
            <rect x={-(S.pill * 3.4)} y={-S.pill * 1.05} width={S.pill * 6.8} height={S.pill * 2.1} rx={S.pill * 1.05} />
            <text textAnchor="middle" y={S.pill * 0.36} style={{ fontSize: S.pill }}>💬 {tr(F.discuss)}</text>
          </g>

          {/* flywheels */}
          {rings.map((ring, i) => (
            <g key={i} className={`rsi-ring ring-${i}`}>
              <circle cx={ring.cx} cy={ring.cy} r={ring.r} className="rsi-track" />
              <path ref={fillRefs[i]} className="rsi-fill" stroke={`url(#rsi-g${i})`} />
              <text x={ring.cx} y={ring.cy - (portrait ? S.lobe * 0.9 : 4)} textAnchor="middle" className="rsi-lobe" style={{ fontSize: S.lobe }}>
                {portrait
                  ? F.lobes[i].short.map((w, k) => <tspan key={k} x={ring.cx} dy={k ? S.lobe * 1.15 : 0}>{tr(w)}</tspan>)
                  : tr(F.lobes[i].title)}
              </text>
              <text x={ring.cx} y={ring.cy + (portrait ? S.lobe * 1.6 : 18)} textAnchor="middle" className="rsi-lobe-sub" style={{ fontSize: S.lobeSub }}>{tr(F.lobes[i].sub)}</text>
            </g>
          ))}
          {chevrons.map((c, i) => <path key={i} d="M-3.5 -6.5 L3.5 0 L-3.5 6.5" transform={`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)}) rotate(${c.rot.toFixed(1)})`} className="rsi-chevron" />)}

          <g ref={dotRef} className="rsi-pulse ring-0">
            <circle r="16" className="rsi-pulse-glow" filter="url(#rsi-glow)" />
            <circle r="6.5" className="rsi-pulse-core" />
          </g>

          {nodes.map((n, i) => (
            <g key={i} className={`rsi-node ring-${n.ring}${i === step ? ' is-active' : ''}${gated.includes(i) ? ' is-gated' : ''}`}
              role="button" tabIndex={0} aria-label={`${tr(F.stepLabel)} ${i + 1}: ${fullName(F.steps[i])}`} aria-pressed={i === step}
              onClick={() => goTo(i)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i) } }}>
              <circle cx={n.pos[0]} cy={n.pos[1]} r={G.node + 12} className="rsi-node-halo" />
              <circle cx={n.pos[0]} cy={n.pos[1]} r={G.node} className="rsi-node-dot" filter="url(#rsi-shadow)" />
              <text x={n.pos[0]} y={n.pos[1] + S.node * 0.36} textAnchor="middle" className="rsi-node-n" style={{ fontSize: S.node }}>{i + 1}</text>
              <StepLabel at={n.pos} angle={n.angle} lines={lines(F.steps[i])} size={S.label} />
            </g>
          ))}

          {/* the RSI agent sits where the two flywheels meet */}
          <g className="rsi-agent" filter="url(#rsi-shadow)">
            <rect x={A.cx - A.w / 2} y={A.cy - A.h / 2} width={A.w} height={A.h} rx="18" className="rsi-agent-card" />
            <rect x={A.cx - A.w / 2} y={A.cy - A.h / 2} width={A.w} height="5" rx="2.5" fill="url(#rsi-stripe)" />
            <image href={logo} x={A.cx - A.w / 2 + 16} y={A.cy - A.h / 2 + 15} width={S.agent * 1.3} height={S.agent * 1.3} />
            <text x={A.cx - A.w / 2 + 22 + S.agent * 1.3} y={A.cy - A.h / 2 + 15 + S.agent * 1.02} className="rsi-agent-title" style={{ fontSize: S.agent }}>{tr(F.agent)}</text>
            {[F.model, F.harness].map((name, i) => {
              const pw = A.w - 32, ph = S.pill * 2.15
              const py = A.cy - A.h / 2 + S.agent * 2.55 + i * (ph + 8)
              return (
                <g key={`${i}-${versions[i]}`} className={`rsi-pill ring-${i}`}>
                  <rect x={A.cx - pw / 2} y={py} width={pw} height={ph} rx={ph / 2} />
                  <text x={A.cx - pw / 2 + 14} y={py + ph / 2 + S.pill * 0.36} style={{ fontSize: S.pill }}>{tr(name)}</text>
                  <text x={A.cx + pw / 2 - 14} y={py + ph / 2 + S.pill * 0.36} textAnchor="end" className="rsi-pill-v" style={{ fontSize: S.pill }}>v{versions[i]}</text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      <aside className="rsi-side" aria-live="polite">
        <div className="rsi-side-head">
          <span className={`rsi-step-num ring-${STEP_ANGLES[step][0]}`}>{step + 1}</span>
          <span className="rsi-step-name">{fullName(current)}</span>
        </div>
        {current.rule != null && <p className="rsi-rule-badge">{tr(F.rules[current.rule].full)}</p>}
        <ol className="rsi-messages" key={`${step}-${zh}`}>
          {current.messages.map(([who, text], i) => (
            <li key={i} className={`rsi-msg is-${who}`} style={{ '--i': i }}>
              <span className="rsi-avatar" aria-hidden="true">
                {who === 'agent' ? <img src={logo} alt="" /> : <svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4" /><path d="M4 21c1.5-4.5 4.5-6.5 8-6.5s6.5 2 8 6.5" /></svg>}
              </span>
              <div>
                <p className="rsi-who">{tr(who === 'agent' ? F.agentName : F.humanName)}</p>
                <p className="rsi-text">{tr(text)}</p>
              </div>
            </li>
          ))}
          {current.event && (
            <li className="rsi-event" style={{ '--i': current.messages.length }}>
              ✓ {tr(current.event)} → {tr(current.bump === 0 ? F.model : F.harness)} v{versions[current.bump]}
            </li>
          )}
        </ol>
        <p className="rsi-note">{tr(F.note)}</p>
      </aside>

      <div className="rsi-controls">
        <button type="button" className="rsi-ctrl" onClick={() => goTo(step - 1)} aria-label={tr(F.prev)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button type="button" className="rsi-ctrl is-play" onClick={() => setPlaying(p => !p)} aria-label={tr(playing ? F.pause : F.play)} aria-pressed={playing}>
          {playing
            ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12" /></svg>
            : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>}
        </button>
        <button type="button" className="rsi-ctrl" onClick={() => goTo(step + 1)} aria-label={tr(F.next)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
        <ol className="rsi-steps">
          {F.steps.map((s, i) => (
            <li key={i}>
              <button type="button" className={`rsi-step ring-${STEP_ANGLES[i][0]}`} aria-current={i === step ? 'step' : undefined} onClick={() => goTo(i)}>
                <span className="rsi-step-dot">{i + 1}</span>
                <span className="rsi-step-text">{fullName(s)}</span>
                {i === step && autoplay && <span className="rsi-step-timer" key={step} style={{ '--ms': `${STEP_MS}ms` }} />}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
