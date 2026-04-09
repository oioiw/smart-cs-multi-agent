import type { ReactNode } from 'react'

interface Props {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: Props) {
  return (
    <span className="tooltip" data-tooltip={content}>
      {children}
    </span>
  )
}
