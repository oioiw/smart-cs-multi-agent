import { useState } from 'react'
import { Button } from '../common/Button'
import { Tooltip } from '../common/Tooltip'

interface Props {
  sessionId: string
  onLoad: (sessionId: string) => Promise<void>
}

export function SessionHistoryPanel({ sessionId, onLoad }: Props) {
  const [input, setInput] = useState(sessionId)

  return (
    <section className="panel">
      <div className="panel-header">
        <h3>会话历史</h3>
        <Tooltip content="输入会话ID后可回放历史消息">
          <span className="info-tag">?</span>
        </Tooltip>
      </div>
      <div className="inline-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="粘贴 session_id"
          aria-label="session id"
        />
        <Button variant="secondary" onClick={() => void onLoad(input)} disabled={!input.trim()}>
          加载
        </Button>
      </div>
      <p className="hint">当前会话：{sessionId || '未创建'}</p>
    </section>
  )
}
