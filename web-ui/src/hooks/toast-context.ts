import { createContext } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

export interface ToastContextValue {
  toasts: Toast[]
  push: (message: string, type?: ToastType) => void
  remove: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
