import { useMemo, useState } from 'react'
import {
  complexityDimensions,
  conceptRationales,
  dimensionGuide,
  dimensionAverage,
  disciplineMeta,
  integrationJunctions,
  systemsConcepts,
} from '../content/systemsComplexityData.js'

const fieldOrder = ['network', 'computer', 'security']

const metricInsights = [
  {
    label: 'Deepest abstraction',
    value: 'Formal verification',
    summary: 'Computer science reaches furthest into proof, models, and semantics.',
    why: 'Formal verification receives the only 10.0 depth score because the system, the required property, and the reasoning that connects them must all be stated precisely. It does not lead the integration axis because verification usually makes progress by bounding or abstracting the surrounding world.',
  },
  {
    label: 'Widest integration',
    value: 'Zero-trust cloud',
    summary: 'Identity, policy, services, networks, and telemetry cross ownership boundaries.',
    why: 'Zero-trust multi-cloud enforcement receives the 10.0 integration score because a single access decision may depend on identity, device posture, workload identity, network context, service policy, data sensitivity, and threat telemetry spread across several platforms.',
  },
  {
    label: 'Most live state',
    value: 'Consensus + response',
    summary: 'Both reason about systems that change while the decision is being made.',
    why: 'Consensus and incident response both receive 10.0 for dynamic state, but for different reasons. Consensus must preserve order through asynchronous machine events; response must reconstruct incomplete human and system activity while both the environment and the opponent continue to change.',
  },
  {
    label: 'Added security tax',
    value: 'An opponent',
    summary: 'Security inherits system complexity, then adds adaptation and deception.',
    why: 'This is a qualitative conclusion, not a claim that every security task is harder. At the complex end of the field, security must reason about the same software and infrastructure failures while also considering deliberate input choice, evasion, stolen authority, and an adversary who learns from the defense.',
  },
]

function ScoringGuide() {
  return (
    <details className="scoring-guide">
      <summary>
        <span><b>How to read the index</b> What each score measures and why the map begins at 7.2</span>
        <strong>Open methodology <i aria-hidden="true">+</i></strong>
      </summary>
      <div className="scoring-guide__body">
        <p>
          This atlas begins with eighteen deliberately difficult production-scale concepts, so the visible range is the upper end of a 1–10 scale. A 7 is already substantial; 8 means the dimension is a defining source of difficulty; 9 means it dominates the work; 10 is reserved for an extreme in this comparison set.
        </p>
        <div>
          {complexityDimensions.map((dimension) => (
            <article key={dimension.key}>
              <span>{dimension.label}</span>
              <strong>{dimensionGuide[dimension.key].question}</strong>
              <p>{dimensionGuide[dimension.key].meaning}</p>
            </article>
          ))}
        </div>
        <small>Scores describe the shape of a problem, not the intelligence, seniority, or value of the people working on it.</small>
      </div>
    </details>
  )
}

function ConceptReasoning({ concept, label = 'Why these indicators?' }) {
  const rationale = conceptRationales[concept.id]
  if (!rationale) return null

  return (
    <details className="concept-reasoning" style={{ '--field-color': disciplineMeta[concept.field].color }}>
      <summary>
        <span><b>{label}</b> The argument behind {concept.id}, dimension by dimension</span>
        <strong>Explore <i aria-hidden="true">+</i></strong>
      </summary>
      <div className="concept-reasoning__body">
        <p className="concept-reasoning__position"><b>Why it sits here</b>{rationale.position}</p>
        <div className="concept-reasoning__drivers">
          {complexityDimensions.map((dimension) => (
            <article key={dimension.key}>
              <header><span>{dimension.label}</span><strong>{concept[dimension.key].toFixed(1)}</strong></header>
              <p>{rationale.drivers[dimension.key]}</p>
            </article>
          ))}
        </div>
        <div className="concept-reasoning__next">
          <span>Go one level deeper</span>
          <ul>{rationale.investigate.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </details>
  )
}

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
      {metricInsights.map((metric) => (
        <div key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <p>{metric.summary}</p>
          <details>
            <summary>Why this call? <i aria-hidden="true">+</i></summary>
            <p>{metric.why}</p>
          </details>
        </div>
      ))}
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

      <ScoringGuide />

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
        <ConceptReasoning concept={active} />
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
            <details className="discipline-profile__reasoning">
              <summary>Why this profile? <i aria-hidden="true">+</i></summary>
              <div>
                <p>{meta.profileReason}</p>
                <p><b>Where the boundary appears</b>{meta.boundary}</p>
              </div>
            </details>
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
        <details className="junction-reasoning">
          <summary>
            <span><b>Why this ranking?</b> Reasoning, trade-off, and questions to test</span>
            <strong>Explore <i aria-hidden="true">+</i></strong>
          </summary>
          <div>
            <p><b>The argument</b>{active.why}</p>
            <p><b>The central trade-off</b>{active.tradeoff}</p>
            <section>
              <span>Questions that would validate the design</span>
              <ul>{active.checks.map((check) => <li key={check}>{check}</li>)}</ul>
            </section>
          </div>
        </details>
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
  const [activeId, setActiveId] = useState('SEC-06')
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
    <div className="complexity-table-shell">
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
            <tr key={concept.id} className={concept.id === activeId ? 'is-active' : ''}>
              <td>
                <button
                  type="button"
                  className="complexity-table__concept"
                  onClick={() => setActiveId(concept.id)}
                  aria-pressed={concept.id === activeId}
                >
                  <i data-field={concept.field} />
                  <span>{concept.name}</span>
                  <small>{concept.id === activeId ? 'Selected' : 'Explain'}</small>
                </button>
              </td>
              <td>{disciplineMeta[concept.field].short}</td>
              {complexityDimensions.map((dimension) => <td key={dimension.key}>{concept[dimension.key].toFixed(1)}</td>)}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      <ConceptReasoning
        concept={systemsConcepts.find((concept) => concept.id === activeId) ?? systemsConcepts[0]}
        label="Why this row?"
      />
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
