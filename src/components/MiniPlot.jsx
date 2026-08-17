import { majorData } from '../content/articles.js'

export default function MiniPlot() {
  const x = (value) => 12 + ((value - 2) / 7) * 76
  const y = (value) => 88 - ((value - 50) / 90) * 72

  return (
    <div className="mini-plot" aria-hidden="true">
      <div className="mini-plot__label">MID-CAREER PAY</div>
      <svg viewBox="0 0 100 100" role="img">
        <line x1="12" y1="52" x2="92" y2="52" className="mini-plot__median" />
        <line x1="51" y1="10" x2="51" y2="88" className="mini-plot__median" />
        <line x1="12" y1="88" x2="92" y2="88" className="mini-plot__axis" />
        <line x1="12" y1="10" x2="12" y2="88" className="mini-plot__axis" />
        {majorData.map((major) => (
          <circle
            key={major.name}
            cx={x(major.rigor)}
            cy={y(major.mid)}
            r={major.name === 'Marketing' || major.name === 'Chemical Engineering' ? 2.2 : 1.25}
            data-group={major.group}
          />
        ))}
      </svg>
      <div className="mini-plot__axis-label">RIGOR INDEX →</div>
    </div>
  )
}
