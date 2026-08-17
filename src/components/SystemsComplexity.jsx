import { useMemo, useState } from 'react'
import {
  categoryRule,
  complexityDimensions,
  complexityThreshold,
  conceptAudit,
  conceptRationales,
  dimensionGuide,
  dimensionAverage,
  disciplineMeta,
  evidenceLibrary,
  integrationJunctions,
  scoreAnchors,
  systemsConcepts,
} from '../content/systemsComplexityData.js'

const fieldOrder = ['network', 'computer', 'security']

const metricInsights = [
  {
    label: 'Highest depth band',
    value: 'Proof + ordering',
    summary: 'Consensus, concurrency, formal verification, and cryptography all require proof-level precision.',
    why: 'A 10 does not mean these concepts are equally difficult in every situation. It means the same depth anchor applies: small changes to assumptions can alter what can be guaranteed. Their other scores separate them—concurrency and formal verification are more bounded, while cryptography integrates a larger operational lifecycle.',
  },
  {
    label: 'Widest integration band',
    value: 'No single owner',
    summary: 'BGP, hybrid cloud, identity, zero trust, supply chain, response, and cloud IAM reach ecosystem scale.',
    why: 'Each receives a 10 because the outcome crosses organizational or provider boundaries and no owner has complete end-to-end control. The score does not say their architectures are identical; it says they meet the same published integration anchor.',
  },
  {
    label: 'Most live state',
    value: 'Consensus + response',
    summary: 'Both reason about systems that change while the decision is being made.',
    why: 'Consensus and incident response both receive 10 for dynamic state, but for different reasons. Consensus must preserve order through asynchronous machine events; response must reconstruct incomplete human and system activity while both the environment and the opponent continue to change.',
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
        <span><b>How to audit the index</b> Every integer, category rule, and quadrant boundary</span>
        <strong>Open methodology <i aria-hidden="true">+</i></strong>
      </summary>
      <div className="scoring-guide__body">
        <p>
          This is an ordinal editorial index, not a measured natural quantity. Primary sources establish what each concept requires; the written anchor below determines the integer assigned. The full 1–10 range stays visible even though this deliberately selected set clusters near the difficult end.
        </p>
        <p>
          The dashed lines sit at {complexityThreshold} because that is where the rubric first says a dimension is <em>defining</em>. They are interpretive thresholds—not a median, percentile, or claim that 7 is a universal boundary between easy and hard.
        </p>
        <section className="category-guide">
          <header><span>Category rule</span><strong>{categoryRule.title}</strong><p>{categoryRule.copy}</p></header>
          <div>
            {fieldOrder.map((field) => (
              <article data-field={field} key={field}>
                <span>{categoryRule[field].label}</span>
                <p>{categoryRule[field].rule}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="scoring-rubric">
          {complexityDimensions.map((dimension) => (
            <details key={dimension.key}>
              <summary>
                <span><b>{dimension.label}</b>{dimensionGuide[dimension.key].question}</span>
                <strong>1–10 anchors <i aria-hidden="true">+</i></strong>
              </summary>
              <p>{dimensionGuide[dimension.key].meaning}</p>
              <ol>
                {Object.entries(scoreAnchors[dimension.key]).map(([score, anchor]) => (
                  <li key={score}><b>{score}</b><span>{anchor}</span></li>
                ))}
              </ol>
            </details>
          ))}
        </div>
        <small>Scores describe the shape of a production-scale problem, not the intelligence, seniority, or value of the people working on it. They can change with scope, scale, tooling, legacy constraints, regulation, and threat model.</small>
      </div>
    </details>
  )
}

function ConceptReasoning({ concept, label = 'Why these indicators?' }) {
  const rationale = conceptRationales[concept.id]
  const audit = conceptAudit[concept.id]
  if (!rationale || !audit) return null

  return (
    <details className="concept-reasoning" style={{ '--field-color': disciplineMeta[concept.field].color }}>
      <summary>
        <span><b>{label}</b> The argument behind {concept.id}, dimension by dimension</span>
        <strong>Explore <i aria-hidden="true">+</i></strong>
      </summary>
      <div className="concept-reasoning__body">
        <p className="concept-reasoning__position"><b>Why it sits here</b>{rationale.position}</p>
        <div className="concept-classification">
          <span>Why {disciplineMeta[concept.field].name}?</span>
          <strong>{audit.classification}</strong>
          <p><b>Adjacent fields</b>{audit.adjacent}</p>
        </div>
        <div className="concept-reasoning__drivers">
          {complexityDimensions.map((dimension) => (
            <article key={dimension.key}>
              <header><span>{dimension.label}</span><strong>{concept[dimension.key]}</strong></header>
              <p>{rationale.drivers[dimension.key]}</p>
              <small><b>What {concept[dimension.key]} means</b>{scoreAnchors[dimension.key][concept[dimension.key]]}</small>
            </article>
          ))}
        </div>
        <div className="concept-evidence">
          <span>Evidence used to map this concept</span>
          <div>
            {audit.evidence.map((sourceKey) => {
              const source = evidenceLibrary[sourceKey]
              return (
                <a href={source.url} target="_blank" rel="noreferrer" key={sourceKey}>
                  <strong>{source.label}</strong>
                  <p>{source.supports}</p>
                  <i aria-hidden="true">↗</i>
                </a>
              )
            })}
          </div>
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
          <strong>{concept[dimension.key]}</strong>
        </div>
      ))}
    </div>
  )
}

function GuidedConceptExplanation({ concept }) {
  const rationale = conceptRationales[concept.id]
  const audit = conceptAudit[concept.id]

  return (
    <article
      className="guided-concept-explanation"
      id="guided-concept-explanation"
      style={{ '--field-color': disciplineMeta[concept.field].color }}
      aria-live="polite"
    >
      <header>
        <div>
          <span>{concept.id} · full explanation</span>
          <h3>{concept.name}</h3>
          <p>{audit.plain}</p>
        </div>
        <DimensionBars concept={concept} />
      </header>

      <div className="guided-concept-explanation__body">
        <section>
          <span>Why it is positioned here</span>
          <p>{rationale.position}</p>
          <p><b>Why this belongs primarily to {disciplineMeta[concept.field].name}.</b> {audit.classification}</p>
          <p><b>Why the boundaries still overlap.</b> {audit.adjacent}</p>
        </section>

        <section>
          <span>The two scores visible on the tile</span>
          <p><b>Precision · {concept.depth}/10.</b> {rationale.drivers.depth} On this rubric, that score means: {scoreAnchors.depth[concept.depth]}</p>
          <p><b>Coordination · {concept.integration}/10.</b> {rationale.drivers.integration} On this rubric, that score means: {scoreAnchors.integration[concept.integration]}</p>
        </section>

        <section>
          <span>What becomes difficult in a live system</span>
          <p><b>Changing state · {concept.state}/10.</b> {rationale.drivers.state} The score reflects this anchor: {scoreAnchors.state[concept.state]}</p>
          <p><b>Finding the real cause · {concept.opacity}/10.</b> {rationale.drivers.opacity} The score reflects this anchor: {scoreAnchors.opacity[concept.opacity]}</p>
          <p><b>Pressure from an attacker · {concept.adversary}/10.</b> {rationale.drivers.adversary} The score reflects this anchor: {scoreAnchors.adversary[concept.adversary]}</p>
        </section>

        <blockquote>
          <span>The practical reason it stays hard</span>
          <p>{concept.hard}</p>
          <p>{concept.core}</p>
        </blockquote>

        <section className="guided-concept-explanation__questions">
          <span>Questions that take the idea one level deeper</span>
          {rationale.investigate.map((question, index) => (
            <p key={question}><b>Question {index + 1}.</b> {question}</p>
          ))}
        </section>

        <section className="guided-concept-explanation__sources">
          <span>Primary evidence behind the reasoning</span>
          <div>
            {audit.evidence.map((sourceKey) => {
              const source = evidenceLibrary[sourceKey]
              return (
                <a href={source.url} target="_blank" rel="noreferrer" key={sourceKey}>
                  <strong>{source.label}</strong>
                  <p>{source.supports}</p>
                  <i aria-hidden="true">↗</i>
                </a>
              )
            })}
          </div>
        </section>
      </div>
    </article>
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
  const [view, setView] = useState('guided')
  const [field, setField] = useState('network')
  const [activeId, setActiveId] = useState('NET-01')
  const active = systemsConcepts.find((concept) => concept.id === activeId) ?? systemsConcepts[0]
  const guidedConcepts = systemsConcepts.filter((concept) => concept.field === field)
  const W = 980
  const H = 580
  const M = { top: 42, right: 34, bottom: 76, left: 78 }
  const min = 1
  const max = 10
  const x = (value) => M.left + ((value - min) / (max - min)) * (W - M.left - M.right)
  const y = (value) => H - M.bottom - ((value - min) / (max - min)) * (H - M.top - M.bottom)
  const ticks = [1, 3, 5, 7, 9, 10]
  const pointOffset = (concept) => {
    const matches = systemsConcepts.filter((candidate) => candidate.depth === concept.depth && candidate.integration === concept.integration)
    if (matches.length === 1) return 0
    const index = matches.findIndex((candidate) => candidate.id === concept.id)
    if (concept.depth >= 9) return index * -15
    return (index - ((matches.length - 1) / 2)) * 15
  }

  const chooseField = (nextField) => {
    setField(nextField)
    if (nextField !== 'all') {
      setActiveId(systemsConcepts.find((concept) => concept.field === nextField)?.id ?? systemsConcepts[0].id)
    }
  }

  const openGuidedConcept = (conceptId) => {
    setActiveId(conceptId)
    window.requestAnimationFrame(() => {
      const target = document.getElementById('guided-concept-explanation')
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    })
  }

  const balanceLabel = (concept) => {
    const difference = concept.depth - concept.integration
    if (difference >= 2) return 'Precision is the bigger challenge'
    if (difference <= -2) return 'Coordination is the bigger challenge'
    return 'Precision and coordination combine'
  }

  return (
    <div className="complexity-atlas">
      <div className="complexity-view-switch" role="group" aria-label="Choose how to explore the complexity comparison">
        <button type="button" className={view === 'guided' ? 'is-active' : ''} onClick={() => { setView('guided'); if (field === 'all') chooseField('network') }}>
          <span>Start here</span>
          <strong>Plain-English tour</strong>
          <small>Six readable ideas at a time</small>
        </button>
        <button type="button" className={view === 'technical' ? 'is-active' : ''} onClick={() => setView('technical')}>
          <span>Go deeper</span>
          <strong>Technical map</strong>
          <small>All scores on two axes</small>
        </button>
      </div>

      <ScoringGuide />

      <div className="complexity-atlas__toolbar" aria-label={view === 'guided' ? 'Choose a discipline' : 'Filter concepts by discipline'}>
        <span>{view === 'guided' ? 'Choose a field' : 'Highlight a field'}</span>
        {view === 'technical' && <button type="button" className={field === 'all' ? 'is-active' : ''} onClick={() => chooseField('all')}>All 18</button>}
        {fieldOrder.map((key) => (
          <button
            type="button"
            className={field === key ? 'is-active' : ''}
            data-field={key}
            key={key}
            onClick={() => chooseField(key)}
          >
            <i /> {disciplineMeta[key].name}
          </button>
        ))}
      </div>

      {view === 'guided' ? (
        <section className="complexity-guided" data-field={field} aria-labelledby="guided-complexity-title">
          <header>
            <div>
              <span>{disciplineMeta[field].short} · the plain-language question</span>
              <h3 id="guided-complexity-title">{disciplineMeta[field].readerQuestion}</h3>
              <p>{disciplineMeta[field].readerTakeaway}</p>
            </div>
            <aside>
              <span>How to read the cards</span>
              <p><b>Precision</b> asks how exact the thinking must be.</p>
              <p><b>Coordination</b> asks how many systems and owners must agree.</p>
            </aside>
          </header>
          <div className="complexity-guided__cards">
            {guidedConcepts.map((concept) => (
              <button
                type="button"
                className={concept.id === activeId ? 'is-active' : ''}
                key={concept.id}
                onClick={() => openGuidedConcept(concept.id)}
                aria-pressed={concept.id === activeId}
              >
                <span>{concept.id} · {balanceLabel(concept)}</span>
                <strong>{concept.name}</strong>
                <p>{conceptAudit[concept.id].plain}</p>
                <footer>
                  <span>Precision <b>{concept.depth}/10</b></span>
                  <span>Coordination <b>{concept.integration}/10</b></span>
                  <span className="complexity-guided__action">{concept.id === activeId ? 'Explanation open' : 'Read full explanation'} ↓</span>
                </footer>
              </button>
            ))}
          </div>
          <p className="complexity-guided__hint">Select any card to open its complete reasoning below. The technical map preserves the full two-axis comparison when you want it.</p>
          <GuidedConceptExplanation concept={active} />
        </section>
      ) : (
        <div className="complexity-atlas__plot">
          <div className="complexity-plot-key">
            <p><b>Move right</b> when a concept needs more exact theory or semantics.</p>
            <p><b>Move up</b> when more systems, teams, or organizations must cooperate.</p>
            <small>The lower half is sparse because this atlas intentionally begins with difficult production-scale concepts.</small>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="complexity-map-title complexity-map-desc">
            <title id="complexity-map-title">Technical map of exact thinking versus system coordination</title>
            <desc id="complexity-map-desc">Eighteen difficult concepts from network engineering, computer science, and security engineering. Move right for more exact theory and up for more systems that must cooperate.</desc>

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
              <line x1={x(complexityThreshold)} x2={x(complexityThreshold)} y1={M.top} y2={H - M.bottom} />
              <line x1={M.left} x2={W - M.right} y1={y(complexityThreshold)} y2={y(complexityThreshold)} />
              <text x={M.left + 14} y={M.top + 20}>COORDINATION IS THE HARD PART</text>
              <text x={W - M.right - 14} y={M.top + 20} textAnchor="end">THEORY + COORDINATION COMBINE</text>
              <text x={M.left + 14} y={H - M.bottom - 15}>MORE CONTAINED</text>
              <text x={W - M.right - 14} y={H - M.bottom - 15} textAnchor="end">PRECISION IS THE HARD PART</text>
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
                    transform={`translate(${x(concept.depth) + pointOffset(concept)} ${y(concept.integration)})`}
                    role="button"
                    tabIndex="0"
                    aria-label={`${concept.name}: precision ${concept.depth}, coordination ${concept.integration}`}
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
                    <circle r={isActive ? 16 : 12} />
                    <text textAnchor="middle" y="3">{concept.id.split('-')[1]}</text>
                  </g>
                )
              })}
            </g>

            <text className="complexity-axis-title" x={(M.left + W - M.right) / 2} y={H - 17} textAnchor="middle">MORE EXACT THEORY &amp; PRECISION →</text>
            <text className="complexity-axis-title" transform={`translate(20 ${(M.top + H - M.bottom) / 2}) rotate(-90)`} textAnchor="middle">MORE SYSTEMS &amp; OWNERS MUST COOPERATE →</text>
          </svg>
        </div>
      )}

      {view === 'technical' && (
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
      )}
      <p className="chart-hint">Scores remain the same in both views. The guided cards translate the two graph axes into ordinary language; the technical map retains the full 1–10 scale and score-7 threshold.</p>
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
              {complexityDimensions.map((dimension) => <td key={dimension.key}>{concept[dimension.key]}</td>)}
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
