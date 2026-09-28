import { hero, links, metrics, ui } from '../data/content'
import { useTr } from '../../lib/i18n'
import ExternalLink from './ExternalLink'
import RsiFigure from './RsiFigure'

export default function Hero() {
  const tr = useTr()
  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <p className="hero-kicker"><span className="kicker-dot" aria-hidden="true" />{tr(hero.kicker)}</p>
        <h1 className="hero-title">
          <span className="hero-name">{hero.name}</span>
          <span className="hero-tagline">{tr(hero.tagline)}</span>
        </h1>
        <p className="hero-lead">{tr(hero.lead)}</p>
        <div className="hero-actions">
          <ExternalLink className="button button-primary" href={links.report}>{tr(ui.report)}</ExternalLink>
          <ExternalLink className="button" href={links.github}>GitHub</ExternalLink>
          <ExternalLink className="button" href={links.huggingface}>Hugging Face</ExternalLink>
          <a className="button button-ghost" href="#rd-cases">{tr(ui.watchDemos)} <span aria-hidden="true">↓</span></a>
        </div>
      </div>

      <figure className="hero-figure">
        <RsiFigure />
        <figcaption><b>{tr(hero.figureLabel)}.</b> {tr(hero.figureCaption)}</figcaption>
      </figure>

      <dl className="hero-metrics">
        {metrics.map(m => (
          <div key={m.value} className="metric">
            <dt><span className="metric-value">{m.value}</span> <span className="metric-unit">{tr(m.unit)}</span></dt>
            <dd>{tr(m.label)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
