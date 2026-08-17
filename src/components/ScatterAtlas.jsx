import { useState } from 'react'
import { majorData } from '../content/articles.js'

const W = 920
const H = 540
const M = { top: 42, right: 38, bottom: 72, left: 76 }
const xMin = 2
const xMax = 9.5
const yMin = 40
const yMax = 145

const colors = {
  stem: '#d9ff5b',
  professional: '#70e1ff',
  culture: '#e8a8ff',
}

function xScale(value) {
  return M.left + ((value - xMin) / (xMax - xMin)) * (W - M.left - M.right)
}

function yScale(value) {
  return H - M.bottom - ((value - yMin) / (yMax - yMin)) * (H - M.top - M.bottom)
}

export default function ScatterAtlas() {
  const [active, setActive] = useState(majorData.find((item) => item.name === 'Marketing'))
  const xTicks = [2, 3, 4, 5, 6, 7, 8, 9]
  const yTicks = [40, 60, 80, 100, 120, 140]

  return (
    <div className="atlas-chart-wrap">
      <div className="chart-legend" aria-label="Legend">
        <span><i style={{ background: colors.stem }} /> STEM & quantitative</span>
        <span><i style={{ background: colors.professional }} /> Business & professional</span>
        <span><i style={{ background: colors.culture }} /> Humanities, arts & education</span>
      </div>

      <div className="atlas-chart">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="atlas-title atlas-desc">
          <title id="atlas-title">Rigor index versus mid-career median pay</title>
          <desc id="atlas-desc">An interactive scatter plot of 25 college majors. Select a point for details.</desc>

          <g className="chart-grid">
            {yTicks.map((tick) => (
              <g key={tick}>
                <line x1={M.left} x2={W - M.right} y1={yScale(tick)} y2={yScale(tick)} />
                <text x={M.left - 16} y={yScale(tick) + 4} textAnchor="end">${tick}K</text>
              </g>
            ))}
            {xTicks.map((tick) => (
              <g key={tick}>
                <line x1={xScale(tick)} x2={xScale(tick)} y1={M.top} y2={H - M.bottom} />
                <text x={xScale(tick)} y={H - M.bottom + 28} textAnchor="middle">{tick}</text>
              </g>
            ))}
          </g>

          <g className="chart-quadrants">
            <line x1={xScale(5.7)} x2={xScale(5.7)} y1={M.top} y2={H - M.bottom} />
            <line x1={M.left} x2={W - M.right} y1={yScale(97)} y2={yScale(97)} />
            <text x={M.left + 16} y={M.top + 24}>GENTLER CLIMB / STRONG PAY</text>
            <text x={W - M.right - 16} y={M.top + 24} textAnchor="end">STEEP CLIMB / HIGH SUMMIT</text>
            <text x={M.left + 16} y={H - M.bottom - 18}>LIGHTER LOAD / LIGHTER PAY</text>
            <text x={W - M.right - 16} y={H - M.bottom - 18} textAnchor="end">HARD-WON / MODEST PAY</text>
          </g>

          <line className="trend-line" x1={xScale(2.1)} y1={yScale(70)} x2={xScale(9)} y2={yScale(125)} />

          <g className="chart-points">
            {majorData.map((major) => {
              const isActive = active?.name === major.name
              return (
                <circle
                  key={major.name}
                  cx={xScale(major.rigor)}
                  cy={yScale(major.mid)}
                  r={isActive ? 9 : 6}
                  fill={colors[major.group]}
                  className={isActive ? 'is-active' : ''}
                  tabIndex="0"
                  role="button"
                  aria-label={`${major.name}: rigor ${major.rigor}, mid-career pay $${major.mid},000`}
                  onMouseEnter={() => setActive(major)}
                  onFocus={() => setActive(major)}
                  onClick={() => setActive(major)}
                />
              )
            })}
          </g>

          <text className="chart-axis-title" x={(M.left + W - M.right) / 2} y={H - 15} textAnchor="middle">
            RIGOR INDEX — CORE CONCEPT DIFFICULTY (1–10)
          </text>
          <text className="chart-axis-title" transform={`translate(20 ${(M.top + H - M.bottom) / 2}) rotate(-90)`} textAnchor="middle">
            MID-CAREER MEDIAN PAY
          </text>
        </svg>

        {active && (
          <aside
            className="chart-tooltip"
            style={{
              '--point-x': `${(xScale(active.rigor) / W) * 100}%`,
              '--point-y': `${(yScale(active.mid) / H) * 100}%`,
              '--point-color': colors[active.group],
            }}
            aria-live="polite"
          >
            <span>{active.group}</span>
            <strong>{active.name}</strong>
            <div><b>{active.rigor}</b> rigor</div>
            <div><b>${active.mid}K</b> mid-career</div>
            <small>{active.roles}</small>
          </aside>
        )}
      </div>
      <p className="chart-hint">Hover, tap, or tab through the dots to inspect each major.</p>
    </div>
  )
}
