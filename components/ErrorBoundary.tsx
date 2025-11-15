import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-100 via-orange-50 to-white">
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-xl shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-700 mb-6">
              We encountered an error while loading the content. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-orange-800 text-white rounded-lg hover:bg-orange-900 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

