export default function Section({ id, title, children, muted = false }) {
  return <section id={id} className={muted ? 'section muted' : 'section'}><div className="container"><h2>{title}</h2>{children}</div></section>
}
