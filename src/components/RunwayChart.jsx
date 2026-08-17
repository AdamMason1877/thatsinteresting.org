import { majorData } from '../content/articles.js'

export default function RunwayChart() {
  const rows = [...majorData].sort((a, b) => b.mid - a.mid).slice(0, 12)
  const scale = (value) => ((value - 35) / 105) * 100

  return (
    <div className="runway-chart" role="img" aria-label="Early and mid-career pay for twelve majors">
      <div className="runway-legend"><span><i /> Early career</span><span><i /> Mid-career</span></div>
      {rows.map((major) => (
        <div className="runway-row" key={major.name}>
          <div className="runway-row__label">{major.short}</div>
          <div className="runway-row__track">
            <span className="runway-row__line" style={{ left: `${scale(major.early)}%`, width: `${scale(major.mid) - scale(major.early)}%` }} />
            <span className="runway-row__early" style={{ left: `${scale(major.early)}%` }} />
            <span className="runway-row__mid" style={{ left: `${scale(major.mid)}%` }} />
          </div>
          <div className="runway-row__value">${major.early}K <b>→ ${major.mid}K</b></div>
        </div>
      ))}
      <div className="runway-axis"><span>$40K</span><span>$90K</span><span>$140K</span></div>
    </div>
  )
}
