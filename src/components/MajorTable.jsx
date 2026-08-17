import { useMemo, useState } from 'react'
import { majorData } from '../content/articles.js'

const columns = [
  { key: 'name', label: 'Major' },
  { key: 'rigor', label: 'Rigor' },
  { key: 'early', label: 'Early ($K)' },
  { key: 'mid', label: 'Mid ($K)' },
  { key: 'value', label: '$K / rigor' },
]

export default function MajorTable() {
  const [sort, setSort] = useState({ key: 'mid', direction: 'desc' })
  const rows = useMemo(() => {
    const withValue = majorData.map((major) => ({ ...major, value: major.mid / major.rigor }))
    return withValue.sort((a, b) => {
      const first = a[sort.key]
      const second = b[sort.key]
      const result = typeof first === 'string' ? first.localeCompare(second) : first - second
      return sort.direction === 'asc' ? result : -result
    })
  }, [sort])

  const chooseSort = (key) => {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc',
    }))
  }

  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                <button type="button" onClick={() => chooseSort(column.key)}>
                  {column.label}
                  <span aria-hidden="true">{sort.key === column.key ? (sort.direction === 'desc' ? '↓' : '↑') : '↕'}</span>
                </button>
              </th>
            ))}
            <th scope="col">Typical roles</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((major) => (
            <tr key={major.name}>
              <td><i data-group={major.group} />{major.name}</td>
              <td>{major.rigor.toFixed(1)}</td>
              <td>{major.early}</td>
              <td>{major.mid}</td>
              <td>{major.value.toFixed(1)}</td>
              <td>{major.roles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
