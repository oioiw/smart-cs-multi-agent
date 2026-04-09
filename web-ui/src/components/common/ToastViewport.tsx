import { useToast } from '../../hooks/useToast'

export function ToastViewport() {
  const { toasts, remove } = useToast()
  return (
    <div className="toast-viewport" aria-live="polite">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => remove(toast.id)}
        >
          {toast.message}
        </button>
      ))}
    </div>
  )
}
