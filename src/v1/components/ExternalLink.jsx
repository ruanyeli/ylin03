import { ui } from '../data/content'
import { useTr } from '../../lib/i18n'

// Report / GitHub / Hugging Face links are placeholders until release: keep
// them visible but inert instead of letting "#" jump to the top of the page.
export default function ExternalLink({ href, children, ...props }) {
  const tr = useTr()
  const pending = !href || href === '#'
  if (pending) {
    return <a {...props} href="#" aria-disabled="true" title={tr(ui.comingSoon)} onClick={event => event.preventDefault()}>{children}</a>
  }
  return <a {...props} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}
