export interface ChatRequest {
  message: string
  user_id: string
  session_id?: string
}

export interface ChatResponse {
  response: string
  session_id: string
  intent: string
  compliance_passed: boolean
}

export interface HistoryMessage {
  role: 'user' | 'assistant' | string
  content: string
  timestamp?: string
}

export interface HistoryResponse {
  session_id: string
  messages: HistoryMessage[]
}

export interface ToolItem {
  name: string
  description: string
  category?: string
}

export interface ToolsResponse {
  tools: ToolItem[]
}

export interface MetricsResponse {
  agent_metrics: Record<string, unknown>
  tool_call_log?: unknown[]
}
