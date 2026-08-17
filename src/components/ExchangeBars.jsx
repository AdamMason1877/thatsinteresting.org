import { majorData } from '../content/articles.js'

function BarList({ title, items, reverse = false }) {
  const max = Math.max(...items.map((item) => item.rate))
  return (
    <div className="exchange-list">
      <div className="exchange-list__heading">
        <h3>{title}</h3>
        <span>$K of mid-career pay per rigor point</span>
      </div>
      {items.map((item, index) => (
        <div className="exchange-row" key={item.name}>
          <span className="exchange-row__rank">0{index + 1}</span>
          <span className="exchange-row__name">{item.short}</span>
          <span className="exchange-row__track"><i style={{ width: `${(item.rate / max) * 100}%` }} /></span>
          <strong>{item.rate.toFixed(1)}</strong>
        </div>
      ))}
      {reverse && <p className="exchange-list__note">These majors often unlock more value with graduate credentials.</p>}
    </div>
  )
}

export default function ExchangeBars() {
  const rated = majorData.map((major) => ({ ...major, rate: major.mid / major.rigor }))
  const best = [...rated].sort((a, b) => b.rate - a.rate).slice(0, 6)
  const toughest = [...rated].sort((a, b) => a.rate - b.rate).slice(0, 6)

  return (
    <div className="exchange-grid">
      <BarList title="Best exchange rate" items={best} />
      <BarList title="Toughest exchange rate" items={toughest} reverse />
    </div>
  )
}
