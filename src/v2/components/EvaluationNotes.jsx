import { benchmarks as B } from '../../shared'
import { useTr } from '../../lib/i18n'
import { results as R } from '../copy'

// Settings and metric notes in one table, then the benchmarks still to be reported.
export default function EvaluationNotes() {
  const tr = useTr()
  return (
    <details className="v2-notes">
      <summary>{tr(R.notesSummary)}</summary>
      <h3 id="eval-harness" className="v2-notes-head">{tr(R.harnessTitle)}</h3>
      <p>{tr(B.settingsNote)}</p>
      <table className="v2-kv" aria-labelledby="eval-harness">
        <tbody>
          {[...B.harness, ...R.metrics].map(([name, value]) => <tr key={name}><th scope="row">{name}</th><td>{tr(value)}</td></tr>)}
        </tbody>
      </table>
      <p>{tr(R.pending)}</p>
    </details>
  )
}
