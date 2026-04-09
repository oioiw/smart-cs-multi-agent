import { useState } from 'react'
import { Button } from '../common/Button'

interface Props {
  userId: string
  disabled?: boolean
  onSubmit: (content: string) => Promise<void>
}

const QUICK_PROMPTS = ['我想查询订单状态', '如何申请退款', '帮我创建一个工单']

export function ChatComposer({ userId, disabled, onSubmit }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = async () => {
    const trimmed = value.trim()
    if (!trimmed) return
    setValue('')
    await onSubmit(trimmed)
  }

  return (
    <div className="composer">
      <div className="quick-prompts">
        {QUICK_PROMPTS.map((prompt) => (
          <button key={prompt} className="chip" onClick={() => setValue(prompt)} disabled={disabled}>
            {prompt}
          </button>
        ))}
      </div>
      <div className="composer-row">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              void handleSubmit()
            }
          }}
          placeholder="例如：我的订单 ORD-2024-001 什么时候到？"
          disabled={disabled}
          aria-label="输入消息"
        />
        <Button onClick={() => void handleSubmit()} disabled={disabled || !value.trim()}>
          发送
        </Button>
      </div>
      <p className="hint">当前用户：{userId}。按 Enter 快速发送。</p>
    </div>
  )
}
