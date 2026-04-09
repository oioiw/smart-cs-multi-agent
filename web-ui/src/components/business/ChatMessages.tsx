import type { UiMessage } from '../../hooks/useChat'
import { EmptyState } from '../common/EmptyState'

interface Props {
  messages: UiMessage[]
}

export function ChatMessages({ messages }: Props) {
  if (!messages.length) {
    return (
      <EmptyState
        title="开始第一轮对话"
        description="输入问题后系统会自动进行意图识别、知识检索和合规审查。"
      />
    )
  }

  return (
    <div className="chat-list">
      {messages.map((msg) => (
        <article key={msg.id} className={`chat-item chat-${msg.role === 'user' ? 'user' : 'assistant'}`}>
          <header>{msg.role === 'user' ? '你' : 'SmartCS'}</header>
          <p>{msg.content}</p>
        </article>
      ))}
    </div>
  )
}
