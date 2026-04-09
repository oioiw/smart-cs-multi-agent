import { apiClient } from './client'
import type {
  ChatRequest,
  ChatResponse,
  HistoryResponse,
  MetricsResponse,
  ToolsResponse,
} from '../types/api'

export const smartCsApi = {
  chat: (payload: ChatRequest) =>
    apiClient.request<ChatResponse>('/api/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getHistory: (sessionId: string) =>
    apiClient.request<HistoryResponse>(`/api/history/${encodeURIComponent(sessionId)}`),
  getTools: () => apiClient.request<ToolsResponse>('/api/tools'),
  getMetrics: () => apiClient.request<MetricsResponse>('/api/metrics'),
  async health() {
    try {
      return await apiClient.request<{ status: string; version?: string }>('/api/health')
    } catch {
      return apiClient.request<{ status: string; version?: string }>('/health')
    }
  },
}
