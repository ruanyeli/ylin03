import { useEffect, useState } from 'react'

/*
 * Headline font preview, shown only with ?fonts=1 in the URL. Candidates load on
 * demand, so regular visitors never download them. To make a choice permanent,
 * copy the values into --font-display / --display-weight-* in src/styles/global.css
 * (and the matching import in src/main.jsx).
 */
const CJK = "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC'"
const OPTIONS = [
  { id: 'newsreader', name: 'Newsreader', family: 'Newsreader Variable', fallback: 'serif', hero: 800, heading: 700, tracking: '-.02em', load: () => import('@fontsource-variable/newsreader/opsz.css') },
  { id: 'source-serif-4', name: 'Source Serif 4', family: 'Source Serif 4 Variable', fallback: 'serif', hero: 900, heading: 700, tracking: '-.02em', load: () => import('@fontsource-variable/source-serif-4/opsz.css') },
  { id: 'merriweather', name: 'Merriweather', family: 'Merriweather Variable', fallback: 'serif', hero: 900, heading: 800, tracking: '-.025em', load: () => import('@fontsource-variable/merriweather/opsz.css') },
  { id: 'literata', name: 'Literata', family: 'Literata Variable', fallback: 'serif', hero: 800, heading: 700, tracking: '-.02em', load: () => import('@fontsource-variable/literata/opsz.css') },
  { id: 'fraunces', name: 'Fraunces', family: 'Fraunces Variable', fallback: 'serif', hero: 800, heading: 700, tracking: '-.02em', load: () => import('@fontsource-variable/fraunces/opsz.css') },
  { id: 'inter-tight', name: 'Inter Tight', family: 'Inter Tight Variable', fallback: 'sans-serif', hero: 800, heading: 750, tracking: '-.035em', load: () => import('@fontsource-variable/inter-tight/index.css') },
  { id: 'bricolage', name: 'Bricolage Grotesque', family: 'Bricolage Grotesque Variable', fallback: 'sans-serif', hero: 800, heading: 700, tracking: '-.03em', load: () => import('@fontsource-variable/bricolage-grotesque/opsz.css') },
]
const KEY = 'iquest.fontPreview'
const stack = o => `'${o.family}', ${CJK}, ${o.fallback}`

function apply(option) {
  const root = document.documentElement.style
  root.setProperty('--font-display', stack(option))
  root.setProperty('--display-weight-hero', String(option.hero))
  root.setProperty('--display-weight', String(option.heading))
  root.setProperty('--display-tracking', option.tracking)
}

export default function FontPicker() {
  const [enabled] = useState(() => new URLSearchParams(window.location.search).has('fonts'))
  const [open, setOpen] = useState(true)
  const [current, setCurrent] = useState(() => { try { return localStorage.getItem(KEY) || 'newsreader' } catch { return 'newsreader' } })

  useEffect(() => {
    if (!enabled) return
    OPTIONS.forEach(o => o.load())
  }, [enabled])
  useEffect(() => {
    if (!enabled) return
    apply(OPTIONS.find(o => o.id === current) ?? OPTIONS[0])
    try { localStorage.setItem(KEY, current) } catch { /* optional */ }
  }, [enabled, current])

  if (!enabled) return null
  const option = OPTIONS.find(o => o.id === current) ?? OPTIONS[0]
  return (
    <aside className={`font-picker${open ? '' : ' is-collapsed'}`} aria-label="Headline font preview">
      <button type="button" className="font-picker-head" onClick={() => setOpen(v => !v)}>
        <span>Headline font · 标题字体</span><span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <>
          <ul>
            {OPTIONS.map(o => (
              <li key={o.id}>
                <button type="button" aria-pressed={o.id === current} onClick={() => setCurrent(o.id)}
                  style={{ fontFamily: stack(o), fontWeight: o.hero, letterSpacing: o.tracking }}>
                  IQuest-Q1 <small>{o.name}</small>
                </button>
              </li>
            ))}
          </ul>
          <p>src/styles/global.css<br /><code>--font-display: '{option.family}'</code><br /><code>--display-weight-hero: {option.hero}</code></p>
        </>
      )}
    </aside>
  )
}
