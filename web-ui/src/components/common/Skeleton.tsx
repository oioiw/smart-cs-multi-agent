interface Props {
  lines?: number
}

export function Skeleton({ lines = 3 }: Props) {
  return (
    <div className="skeleton-group" aria-busy="true" aria-label="加载中">
      {Array.from({ length: lines }).map((_, i) => (
        <div className="skeleton-line" key={i} />
      ))}
    </div>
  )
}
