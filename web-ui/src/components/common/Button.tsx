import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  loading?: boolean
  icon?: ReactNode
}

export function Button({
  children,
  variant = 'primary',
  loading,
  icon,
  className,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      className={`btn btn-${variant} ${className ?? ''}`.trim()}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <span className="spinner" /> : icon ? <span className="btn-icon">{icon}</span> : null}
      <span>{children}</span>
    </button>
  )
}
