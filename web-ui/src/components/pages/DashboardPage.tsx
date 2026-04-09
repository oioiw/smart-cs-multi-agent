import { useEffect, useState } from 'react'
import { smartCsApi } from '../../api/smartcs'
import { ApiError } from '../../api/client'
import { useChat } from '../../hooks/useChat'
import { useToast } from '../../hooks/useToast'
import { Button } from '../common/Button'
import { Modal } from '../common/Modal'
import { Skeleton } from '../common/Skeleton'
import { Tooltip } from '../common/Tooltip'
import { ChatComposer } from '../business/ChatComposer'
import { ChatMessages } from '../business/ChatMessages'
import { SessionHistoryPanel } from '../business/SessionHistoryPanel'
import { ToolsPanel } from '../business/ToolsPanel'
import { MetricsPanel } from '../business/MetricsPanel'
import type { ToolItem } from '../../types/api'

export function DashboardPage() {
  const [userId, setUserId] = useState('user_001')
  const [tools, setTools] = useState<ToolItem[]>([])
  const [metrics, setMetrics] = useState<Record<string, unknown> | null>(null)
  const [health, setHealth] = useState('checking')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [loadingPanels, setLoadingPanels] = useState(true)
  const [showConfig, setShowConfig] = useState(false)

  const { push } = useToast()
  const chat = useChat()

  useEffect(() => {
    const pref = localStorage.getItem('smartcs-theme')
    if (pref === 'dark' || pref === 'light') {
      setTheme(pref)
      document.documentElement.dataset.theme = pref
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      setLoadingPanels(true)
      try {
        const [toolData, metricData, healthData] = await Promise.all([
          smartCsApi.getTools(),
          smartCsApi.getMetrics(),
          smartCsApi.health(),
        ])
        setTools(toolData.tools)
        setMetrics(metricData.agent_metrics)
        setHealth(healthData.status)
      } catch {
        setHealth('offline')
        push('后端暂不可达，仍可继续体验前端界面。', 'error')
      } finally {
        setLoadingPanels(false)
      }
    }

    void init()
  }, [push])

  const onSend = async (content: string) => {
    try {
      await chat.sendMessage(userId || 'anonymous', content)
      const metricData = await smartCsApi.getMetrics()
      setMetrics(metricData.agent_metrics)
      push('消息发送成功', 'success')
    } catch (error) {
      const msg = error instanceof ApiError ? error.message : '发送失败'
      push(msg, 'error')
    }
  }

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('smartcs-theme', next)
    document.documentElement.dataset.theme = next
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="brand">Smart CS</p>
          <h1>多 Agent 工作台</h1>
          <p className="muted">统一查看会话、工具与系统指标。</p>
        </div>
        <div className="status-list">
          <div><span>服务状态</span><strong>{health}</strong></div>
          <div><span>Session</span><strong>{chat.sessionId || '—'}</strong></div>
          <div><span>意图</span><strong>{chat.intent}</strong></div>
          <div><span>合规</span><strong>{chat.compliancePassed ? '通过' : '未通过'}</strong></div>
        </div>
        <div className="sidebar-actions">
          <Button variant="secondary" onClick={() => setShowConfig(true)}>配置</Button>
          <Tooltip content="浅色/暗色切换">
            <Button variant="ghost" onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</Button>
          </Tooltip>
          <Button variant="danger" onClick={chat.reset}>新会话</Button>
        </div>
      </aside>

      <main className="content">
        <section className="panel chat-panel">
          <div className="panel-header"><h2>智能对话</h2></div>
          <ChatMessages messages={chat.messages} />
          <ChatComposer userId={userId} disabled={!chat.canSend} onSubmit={onSend} />
        </section>

        <section className="grid-2">
          <SessionHistoryPanel
            sessionId={chat.sessionId}
            onLoad={async (id) => {
              try {
                await chat.loadHistory(id)
                push('历史会话已加载', 'success')
              } catch {
                push('加载历史失败，请确认 session_id', 'error')
              }
            }}
          />
          {loadingPanels ? <Skeleton lines={5} /> : <ToolsPanel tools={tools} />}
        </section>

        <section>{loadingPanels ? <Skeleton lines={4} /> : <MetricsPanel metrics={metrics} />}</section>
      </main>

      <Modal open={showConfig} onClose={() => setShowConfig(false)} title="工作台配置">
        <div className="stack">
          <label htmlFor="user-id">默认用户ID</label>
          <input
            id="user-id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="user_001"
          />
          <p className="hint">API 基地址：{import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'}</p>
        </div>
      </Modal>
    </div>
  )
}
