import type { ReactNode } from 'react'
import { Button } from './Button'

interface Props {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, title, onClose, children }: Props) {
  if (!open) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal-header">
          <h3>{title}</h3>
          <Button variant="ghost" onClick={onClose} aria-label="关闭">×</Button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
