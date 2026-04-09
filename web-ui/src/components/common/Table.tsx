import type { ReactNode } from 'react'

export interface Column<T> {
  key: string
  title: string
  render: (row: T) => ReactNode
}

interface Props<T> {
  columns: Column<T>[]
  data: T[]
}

export function Table<T>({ columns, data }: Props<T>) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>{columns.map((c) => <th key={c.key}>{c.title}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>{columns.map((c) => <td key={c.key}>{c.render(row)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
