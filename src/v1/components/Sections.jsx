import { architecture, overview, rsi, training } from '../data/content'
import { useTr } from '../../lib/i18n'
import { selectItem } from './Demos'
import Section from './Section'

export function Overview() {
  const tr = useTr()
  return (
    <Section id="overview" title={overview.title} intro={overview.intro}>
      <div className="card-grid cols-3">
        {overview.cards.map((card, i) => (
          <article key={i} className="card">
            <span className="card-index">{String(i + 1).padStart(2, '0')}</span>
            <h3>{tr(card.title)}</h3>
            <p>{tr(card.body)}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

export function Rsi() {
  const tr = useTr()
  return (
    <Section id="rsi" title={rsi.title} intro={rsi.intro} tone="tint">
      <blockquote className="pull-quote">
        <p>{tr(rsi.quote)}</p>
        <cite>— {tr(rsi.quoteSource)}</cite>
      </blockquote>

      <h3 className="subhead">{tr(rsi.flywheelsTitle)}</h3>
      <div className="card-grid cols-2">
        {rsi.flywheels.map((f, i) => (
          <article key={i} className={`card flywheel flywheel-${i}`}>
            <p className="flywheel-tag">{tr(f.tag)}</p>
            <h4>{tr(f.title)}</h4>
            <ol className="flywheel-steps">
              {f.steps.map((step, k) => <li key={k}><span>{i * 3 + k + 1}</span>{tr(step)}</li>)}
            </ol>
            <p>{tr(f.body)}</p>
          </article>
        ))}
      </div>

      <h3 className="subhead">{tr(rsi.gatesTitle)}</h3>
      <p className="subhead-intro">{tr(rsi.gatesIntro)}</p>
      <ol className="gates">
        {rsi.gates.map((g, i) => (
          <li key={i} className="gate">
            <span className="gate-mark" aria-hidden="true">{i + 1}</span>
            <h4>{tr(g.title)}</h4>
            <p>{tr(g.body)}</p>
          </li>
        ))}
      </ol>

      <h3 className="subhead">{tr(rsi.iterationTitle)}</h3>
      <div className="iteration">
        <p>{tr(rsi.iteration)}</p>
        <div className="iteration-side">
          <dl className="stat-row">
            {rsi.stats.map(s => <div key={s.value}><dt>{s.value}</dt><dd>{tr(s.label)}</dd></div>)}
          </dl>
          <p className="fine-print">{tr(rsi.statsNote)}</p>
          <a className="text-link" href="#rd-cases" onClick={() => selectItem('rsi-run')}>{tr(rsi.watchRun)} →</a>
        </div>
      </div>
    </Section>
  )
}

export function Architecture() {
  const tr = useTr()
  return (
    <Section id="architecture" title={architecture.title} intro={architecture.intro}>
      <div className="arch">
        <table className="spec-table">
          <tbody>
            {architecture.specs.map(([k, v], i) => <tr key={i}><th scope="row">{tr(k)}</th><td>{tr(v)}</td></tr>)}
          </tbody>
        </table>
        <div className="card-grid cols-2 arch-cards">
          {architecture.cards.map((c, i) => (
            <article key={i} className="card stat-card">
              <p className="stat-card-value">{c.value}</p>
              <h4>{tr(c.title)}</h4>
              <p>{tr(c.body)}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function Training() {
  const tr = useTr()
  return (
    <Section id="training" title={training.title} intro={training.intro} tone="tint">
      <ol className="pipeline">
        {training.stages.map((s, i) => (
          <li key={i} className="pipeline-stage">
            <p className="pipeline-step">{String(i + 1).padStart(2, '0')}</p>
            <h4>{tr(s.name)}</h4>
            <p className="pipeline-note">{tr(s.note)}</p>
            <p>{tr(s.body)}</p>
          </li>
        ))}
      </ol>
      <h3 className="subhead">{tr(training.postTitle)}</h3>
      <div className="card-grid cols-2">
        {training.post.map((p, i) => (
          <article key={i} className="card card-plain">
            <h4>{tr(p.title)}</h4>
            <p>{tr(p.body)}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
