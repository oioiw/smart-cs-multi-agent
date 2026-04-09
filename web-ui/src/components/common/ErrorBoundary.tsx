import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UI Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>页面出现异常</h2>
          <p>请刷新页面重试。</p>
        </div>
      )
    }

    return this.props.children
  }
}
