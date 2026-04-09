import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ToastContext, type Toast, type ToastType } from './toast-context'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    setToasts((prev) => [...prev, { id, message, type }])
    window.setTimeout(() => remove(id), 3200)
  }, [remove])

  const value = useMemo(() => ({ toasts, push, remove }), [toasts, push, remove])
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
