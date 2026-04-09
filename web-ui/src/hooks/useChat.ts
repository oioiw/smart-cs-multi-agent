import { useCallback, useMemo, useState } from 'react'
import { smartCsApi } from '../api/smartcs'
import { ApiError } from '../api/client'
import type { HistoryMessage } from '../types/api'

export interface UiMessage extends HistoryMessage {
  id: string
}

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

export function useChat() {
  const [messages, setMessages] = useState<UiMessage[]>([])
  const [sessionId, setSessionId] = useState<string>('')
  const [intent, setIntent] = useState<string>('unknown')
  const [compliancePassed, setCompliancePassed] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)

  const canSend = useMemo(() => !loading, [loading])

  const sendMessage = useCallback(async (userId: string, content: string) => {
    setLoading(true)
    const userMessage: UiMessage = { id: createId(), role: 'user', content }
    setMessages((prev) => [...prev, userMessage])

    try {
      const data = await smartCsApi.chat({
        user_id: userId,
        message: content,
        session_id: sessionId || undefined,
      })

      setSessionId(data.session_id)
      setIntent(data.intent)
      setCompliancePassed(data.compliance_passed)
      setMessages((prev) => [...prev, { id: createId(), role: 'assistant', content: data.response }])
      return data
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'assistant',
          content: '抱歉，当前服务暂时不可用，请稍后重试。',
        },
      ])
      throw error instanceof ApiError ? error : new ApiError('发送失败')
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  const loadHistory = useCallback(async (targetSessionId: string) => {
    const data = await smartCsApi.getHistory(targetSessionId)
    setSessionId(data.session_id)
    setMessages(data.messages.map((m) => ({ ...m, id: createId() })))
  }, [])

  const reset = useCallback(() => {
    setMessages([])
    setSessionId('')
    setIntent('unknown')
    setCompliancePassed(true)
  }, [])

  return {
    messages,
    sessionId,
    intent,
    compliancePassed,
    loading,
    canSend,
    sendMessage,
    loadHistory,
    reset,
  }
}
