import { useMemo } from 'react'
import { Table, type Column } from '../common/Table'
import { EmptyState } from '../common/EmptyState'
import type { ToolItem } from '../../types/api'

interface Props {
  tools: ToolItem[]
}

export function ToolsPanel({ tools }: Props) {
  const columns = useMemo<Column<ToolItem>[]>(() => [
    {
      key: 'name',
      title: '工具名',
      render: (row) => <code>{row.name}</code>,
    },
    {
      key: 'desc',
      title: '说明',
      render: (row) => row.description,
    },
    {
      key: 'category',
      title: '分类',
      render: (row) => row.category ?? '—',
    },
  ], [])

  return (
    <section className="panel">
      <div className="panel-header"><h3>MCP 工具</h3></div>
      {!tools.length ? <EmptyState title="暂无工具" description="后端启动后可自动发现工具列表。" /> : <Table columns={columns} data={tools} />}
    </section>
  )
}
