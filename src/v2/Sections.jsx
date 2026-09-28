import { larkScenarios } from '../shared'
import { useLanguageCode, useTr } from '../lib/i18n'
import AsideRow from './components/AsideRow'
import BenchmarkFigure from './components/BenchmarkFigure'
import DemoViewer from './components/DemoViewer'
import EvaluationNotes from './components/EvaluationNotes'
import Figure from './components/Figure'
import RsiFigure from './components/RsiFigure'
import KeyNumbers from './components/KeyNumbers'
import { RecordingCuts, RecordingTabs } from './components/RecordingChooser'
import Section from './components/Section'
import { frontend as FE, office as OF, overview as OV, rdCases as RD, results as RS, rsi as RSI, tocLabels, training as TR } from './copy'
import { jumpTo } from './flash'

const runinEnd = { en: '. ', zh: '：' }

// `gloss` is the English term for a Chinese head, shown on hover (dotted underline).
function RunIn({ head, gloss, children, className = '' }) {
  const tr = useTr()
  const language = useLanguageCode()
  const label = gloss && language === 'zh' ? <abbr className="v2-gloss" title={gloss}>{tr(head)}</abbr> : tr(head)
  return <p className={className}><strong className="v2-runin">{label}{tr(runinEnd)}</strong>{children}</p>
}

function Notes({ notes }) {
  const tr = useTr()
  return notes.map(([head, body, gloss], i) => <RunIn key={i} head={head} gloss={gloss}>{tr(body)}</RunIn>)
}

function CrossLink({ to, onClick, children }) {
  return <a className="v2-link v2-crosslink" href={`#${to}`} onClick={event => { event.preventDefault(); onClick() }}>{children}</a>
}

export function Overview() {
  const tr = useTr()
  return (
    <Section id="overview" title={OV.title}>
      <KeyNumbers />
      <p>{tr(OV.intro)}</p>
      <ol className="v2-contribs">
        {OV.items.map((item, i) => (
          <li key={i}>
            <RunIn head={item.title}>
              {tr(item.body)} <CrossLink to={item.link.id} onClick={() => jumpTo(item.link.id, { flash: false })}>→ {tr(item.link.label)}</CrossLink>
            </RunIn>
          </li>
        ))}
      </ol>
    </Section>
  )
}

// The outlook: a short introduction, the interactive loop, and one iteration of the recorded run.
export function Rsi({ onWatchRun }) {
  const tr = useTr()
  return (
    <Section id="rsi" title={RSI.title}>
      <AsideRow className="has-epigraph" margin={(
        <blockquote className="v2-epigraph">
          <p>{tr(RSI.quote)}</p>
          <cite>{tr(RSI.quoteSource)}</cite>
        </blockquote>
      )}>
        <p className="v2-lede">{tr(RSI.intro)}</p>
      </AsideRow>
      <RsiFigure />
      <AsideRow aside={RSI.outcomes} note={RSI.outcomesNote}>
        <RunIn head={RSI.iterationTitle}>{tr(RSI.iteration)}</RunIn>
        <p><CrossLink to="rd-figure" onClick={onWatchRun}>{tr(RSI.watchRun)}</CrossLink></p>
      </AsideRow>
    </Section>
  )
}

export function Training() {
  return (
    <Section id="training" title={TR.title} intro={TR.intro}>
      <Notes notes={TR.notes} />
    </Section>
  )
}

export function Results() {
  const tr = useTr()
  return (
    <Section id="results" title={RS.title} intro={RS.intro}>
      <BenchmarkFigure />
      <RunIn head={RS.cyberTitle}>{tr(RS.cyber)}</RunIn>
      <EvaluationNotes />
    </Section>
  )
}

export function RdCases({ selected, onSelect, autoPlay }) {
  const tr = useTr()
  return (
    <Section id="rd-cases" title={RD.title} intro={RD.intro}>
      <Figure id="rd-figure">
        <RecordingTabs items={RD.items} selected={selected} onSelect={onSelect} autoPlay={autoPlay} label={tocLabels['rd-cases']} />
      </Figure>
      <div className="v2-stack">
        {RD.items.map(item => {
          const active = item.id === selected
          return (
            <AsideRow key={item.id} className={active ? 'is-active' : ''} aria-hidden={!active} inert={active ? undefined : ''}
              aside={item.stats} asideTitle={item.statsTitle}>
              <h3>{tr(item.title)}</h3>
              <p>{tr(item.lead)}</p>
              <Notes notes={item.notes} />
            </AsideRow>
          )
        })}
      </div>
    </Section>
  )
}

export function Office({ cut, onCut, autoPlay }) {
  const tr = useTr()
  const recorded = larkScenarios.find(s => s.id === OF.recorded.id)
  return (
    <Section id="office" title={OF.title} intro={OF.intro}>
      <Figure id="lark-figure">
        <RecordingCuts title={recorded.title} cuts={recorded.recordings} selected={cut} onSelect={onCut} autoPlay={autoPlay}
          shareId={recorded.id} label={OF.cutsLabel} />
      </Figure>
      <p className="v2-kicker">{tr(OF.recorded.tag)}</p>
      <p>{tr(OF.recorded.lead)}</p>
      <Notes notes={OF.recorded.notes} />
    </Section>
  )
}

export function Frontend({ demoRef, actionsOverlay }) {
  return (
    <Section id="frontend" title={FE.title} intro={FE.intro}>
      <DemoViewer ref={demoRef} actionsOverlay={actionsOverlay} />
    </Section>
  )
}

