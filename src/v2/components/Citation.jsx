import { bibtex } from '../../shared'
import { citation as C } from '../copy'
import CopyButton from './CopyButton'
import Section from './Section'

export default function Citation() {
  return (
    <Section id="citation" title={C.title} intro={C.intro}>
      <p className="v2-citation-plain">{C.plain}</p>
      <div className="v2-code">
        <div className="v2-code-head">
          <span className="v2-label">BibTeX</span>
          <CopyButton getText={() => bibtex} label={C.copyBibtex} />
        </div>
        <pre><code>{bibtex}</code></pre>
      </div>
    </Section>
  )
}
