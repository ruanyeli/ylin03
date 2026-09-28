import { useTr } from '../../lib/i18n'
import { keyNumbers } from '../copy'

export default function KeyNumbers() {
  const tr = useTr()
  return (
    <dl className="v2-facts">
      {keyNumbers.map(item => (
        <div key={item.value}>
          <dt className="v2-num">{item.value}</dt>
          <dd className="v2-facts-unit">{tr(item.unit)}</dd>
          <dd className="v2-facts-label">{tr(item.label)}</dd>
        </div>
      ))}
    </dl>
  )
}
