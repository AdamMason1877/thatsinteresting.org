import { useMemo, useState } from 'react'
import {
  complexityDimensions,
  dimensionAverage,
  disciplineMeta,
  integrationJunctions,
  systemsConcepts,
} from '../content/systemsComplexityData.js'

const fieldOrder = ['network', 'computer', 'security']

function DimensionBars({ concept }) {
  return (
    <div className="concept-dimensions" aria-label={`Complexity profile for ${concept.name}`}>
      {complexityDimensions.map((dimension) => (
        <div className="concept-dimension" key={dimension.key}>
          <span>{dimension.label}</span>
          <i><b style={{ width: `${concept[dimension.key] * 10}%` }} /></i>
          <strong>{concept[dimension.key].toFixed(1)}</strong>
        </div>
      ))}
    </div>
  )
}

export function ComplexityMetrics() {
  return (
    <div className="metrics-strip complexity-metrics">
      <div><span>Deepest abstraction</span><strong>Formal verification</strong><p>Computer science reaches furthest into proof, models, and semantics.</p></div>
      <div><span>Widest integration</span><strong>Zero-trust cloud</strong><p>Identity, policy, services, networks, and telemetry cross ownership boundaries.</p></div>
      <div><span>Most live state</span><strong>Consensus + response</strong><p>Both reason about systems that change while the decision is being made.</p></div>
      <div><span>Added security tax</span><strong>An opponent</strong><p>Security inherits system complexity, then adds adaptation and deception.</p></div>
    </div>
  )
}

export function ComplexityMap() {
  const [field, setField] = useState('all')
  const [activeId, setActiveId] = useState('SEC-03')
  const active = systemsConcepts.find((concept) => concept.id === activeId) ?? systemsConcepts[0]
  const W = 980
  const H = 580
  const M = { top: 42, right: 34, bottom: 76, left: 78 }
  const min = 7.2
  const max = 10.2
  const x = (value) => M.left + ((value - min) / (max - min)) * (W - M.left - M.right)
  const y = (value) => H - M.bottom - ((value - min) / (max - min)) * (H - M.top - M.bottom)
  const ticks = [7.5, 8, 8.5, 9, 9.5, 10]

  return (
    <div className="complexity-atlas">
      <div className="complexity-atlas__toolbar" aria-label="Filter concepts by discipline">
        <button type="button" className={field === 'all' ? 'is-active' : ''} onClick={() => setField('all')}>All 18</button>
        {fieldOrder.map((key) => (
          <button
            type="button"
            className={field === key ? 'is-active' : ''}
            data-field={key}
            key={key}
            onClick={() => setField(key)}
          >
            <i /> {disciplineMeta[key].name}
          </button>
        ))}
      </div>

      <div className="complexity-atlas__plot">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="complexity-map-title complexity-map-desc">
          <title id="complexity-map-title">Conceptual depth versus integration span</title>
          <desc id="complexity-map-desc">Eighteen difficult concepts from network engineering, computer science, and security engineering. Select a labeled point to inspect its five-dimension profile.</desc>

          <g className="complexity-grid">
            {ticks.map((tick) => (
              <g key={`x-${tick}`}>
                <line x1={x(tick)} x2={x(tick)} y1={M.top} y2={H - M.bottom} />
                <text x={x(tick)} y={H - M.bottom + 27} textAnchor="middle">{tick}</text>
              </g>
            ))}
            {ticks.map((tick) => (
              <g key={`y-${tick}`}>
                <line x1={M.left} x2={W - M.right} y1={y(tick)} y2={y(tick)} />
                <text x={M.left - 15} y={y(tick) + 4} textAnchor="end">{tick}</text>
              </g>
            ))}
          </g>

          <g className="complexity-quadrants" aria-hidden="true">
            <line x1={x(8.75)} x2={x(8.75)} y1={M.top} y2={H - M.bottom} />
            <line x1={M.left} x2={W - M.right} y1={y(8.75)} y2={y(8.75)} />
            <text x={M.left + 14} y={M.top + 20}>WIDE SYSTEM / LOWER ABSTRACTION</text>
            <text x={W - M.right - 14} y={M.top + 20} textAnchor="end">THE HARD CORNER</text>
            <text x={W - M.right - 14} y={H - M.bottom - 15} textAnchor="end">DEEPER / MORE CONTAINED</text>
          </g>

          <g className="complexity-points">
            {systemsConcepts.map((concept) => {
              const isActive = concept.id === activeId
              const isMuted = field !== 'all' && field !== concept.field
              return (
                <g
                  key={concept.id}
                  className={`${isActive ? 'is-active' : ''} ${isMuted ? 'is-muted' : ''}`}
                  data-field={concept.field}
                  transform={`translate(${x(concept.depth)} ${y(concept.integration)})`}
                  role="button"
                  tabIndex="0"
                  aria-label={`${concept.name}: conceptual depth ${concept.depth}, integration span ${concept.integration}`}
                  onMouseEnter={() => setActiveId(concept.id)}
                  onFocus={() => setActiveId(concept.id)}
                  onClick={() => setActiveId(concept.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setActiveId(concept.id)
                    }
                  }}
                >
                  <circle r={isActive ? 16 : 12 + ((concept.consequence - 8) * 1.5)} />
                  <text textAnchor="middle" y="3">{concept.id.split('-')[1]}</text>
                </g>
              )
            })}
          </g>

          <text className="complexity-axis-title" x={(M.left + W - M.right) / 2} y={H - 17} textAnchor="middle">CONCEPTUAL DEPTH — ABSTRACTION, THEORY & PRECISION</text>
          <text className="complexity-axis-title" transform={`translate(20 ${(M.top + H - M.bottom) / 2}) rotate(-90)`} textAnchor="middle">INTEGRATION SPAN — SYSTEMS, OWNERS & BOUNDARIES</text>
        </svg>
      </div>

      <aside className="complexity-detail" style={{ '--field-color': disciplineMeta[active.field].color }} aria-live="polite">
        <div className="complexity-detail__copy">
          <span>{active.id} · {disciplineMeta[active.field].name}</span>
          <h3>{active.name}</h3>
          <p>{active.core}</p>
          <blockquote><b>Why it stays hard</b>{active.hard}</blockquote>
        </div>
        <DimensionBars concept={active} />
      </aside>
      <p className="chart-hint">Filter by discipline, then hover, tap, or tab through the numbered points.</p>
    </div>
  )
}

export function DisciplineProfiles() {
  return (
    <div className="discipline-profiles">
      {fieldOrder.map((field) => {
        const meta = disciplineMeta[field]
        return (
          <article className="discipline-profile" data-field={field} key={field}>
            <header>
              <span>{meta.short}</span>
              <h3>{meta.name}</h3>
              <p>{meta.thesis}</p>
            </header>
            <div className="discipline-profile__bars">
              {complexityDimensions.map((dimension) => {
                const value = dimensionAverage(field, dimension.key)
                return (
                  <div key={dimension.key}>
                    <span>{dimension.label}</span>
                    <i><b style={{ width: `${value * 10}%` }} /></i>
                    <strong>{value.toFixed(1)}</strong>
                  </div>
                )
              })}
            </div>
            <footer>
              <span>Native difficulty</span>
              <strong>{meta.nativeDifficulty}</strong>
            </footer>
          </article>
        )
      })}
    </div>
  )
}

export function IntegrationJunctions() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = integrationJunctions[activeIndex]

  return (
    <div className="junctions">
      <div className="junctions__index" aria-label="Complex integration scenarios">
        {integrationJunctions.map((junction, index) => (
          <button
            type="button"
            key={junction.name}
            className={index === activeIndex ? 'is-active' : ''}
            onClick={() => setActiveIndex(index)}
            aria-pressed={index === activeIndex}
          >
            <span>{junction.rank}</span>
            <strong>{junction.name}</strong>
            <i>{junction.verdict}</i>
          </button>
        ))}
      </div>

      <article className="junction-detail" aria-live="polite">
        <header>
          <span>{active.rank} · {active.verdict}</span>
          <h3>{active.name}</h3>
          <p>{active.description}</p>
        </header>
        <div className="junction-weave" aria-label={`Disciplines combined in ${active.name}`}>
          {fieldOrder.map((field) => (
            <div data-field={field} key={field}>
              <span>{disciplineMeta[field].short}</span>
              <strong>{disciplineMeta[field].name}</strong>
              <p>{active[field]}</p>
            </div>
          ))}
        </div>
        <blockquote><span>Characteristic failure</span>{active.failure}</blockquote>
      </article>
    </div>
  )
}

const columns = [
  { key: 'name', label: 'Concept' },
  { key: 'field', label: 'Field' },
  ...complexityDimensions,
]

export function ComplexityTable() {
  const [sort, setSort] = useState({ key: 'integration', direction: 'desc' })
  const rows = useMemo(() => [...systemsConcepts].sort((a, b) => {
    const first = a[sort.key]
    const second = b[sort.key]
    const result = typeof first === 'string' ? first.localeCompare(second) : first - second
    return sort.direction === 'asc' ? result : -result
  }), [sort])

  const chooseSort = (key) => {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc',
    }))
  }

  return (
    <div className="data-table-wrap complexity-table-wrap">
      <table className="data-table complexity-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" aria-sort={sort.key === column.key ? (sort.direction === 'desc' ? 'descending' : 'ascending') : 'none'}>
                <button type="button" onClick={() => chooseSort(column.key)}>
                  {column.label}
                  <span aria-hidden="true">{sort.key === column.key ? (sort.direction === 'desc' ? '↓' : '↑') : '↕'}</span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((concept) => (
            <tr key={concept.id}>
              <td><i data-field={concept.field} />{concept.name}</td>
              <td>{disciplineMeta[concept.field].short}</td>
              {complexityDimensions.map((dimension) => <td key={dimension.key}>{concept[dimension.key].toFixed(1)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SystemsMiniPlot() {
  return (
    <div className="systems-mini" aria-hidden="true">
      {fieldOrder.map((field, fieldIndex) => (
        <div className="systems-mini__lane" data-field={field} key={field} style={{ '--mini-start': `${15 + fieldIndex * 35}%` }}>
          <span>{disciplineMeta[field].short}</span>
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <i
              key={item}
              style={{
                '--mini-step': item,
                '--mini-left': `${15 + fieldIndex * 35 + ((50 - (15 + fieldIndex * 35)) * item) / 5}%`,
                '--mini-top': `${16 + item * 11}%`,
              }}
            />
          ))}
        </div>
      ))}
      <strong>ONE SYSTEM</strong>
    </div>
  )
}
