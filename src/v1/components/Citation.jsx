import { useState } from 'react'
import { citation, ui } from '../data/content'
import { useTr } from '../../lib/i18n'
import Section from './Section'

export default function Citation() {
  const tr = useTr()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation.bibtex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { setCopied(false) }
  }
  return (
    <Section id="citation" title={citation.title} intro={citation.intro}>
      <div className="bibtex">
        <button type="button" className="button button-small bibtex-copy" onClick={copy}>{tr(copied ? ui.copied : ui.copy)}</button>
        <pre><code>{citation.bibtex}</code></pre>
      </div>
    </Section>
  )
}
