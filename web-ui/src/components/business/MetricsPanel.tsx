import { EmptyState } from '../common/EmptyState'

interface Props {
  metrics: Record<string, unknown> | null
}

export function MetricsPanel({ metrics }: Props) {
  return (
    <section className="panel">
      <div className="panel-header"><h3>系统指标</h3></div>
      {!metrics || !Object.keys(metrics).length ? (
        <EmptyState title="暂无指标" description="发送消息后将显示 Agent 统计数据。" />
      ) : (
        <pre className="code-block">{JSON.stringify(metrics, null, 2)}</pre>
      )}
    </section>
  )
}
