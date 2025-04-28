'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode; 
}

interface State {
  hasError: boolean;
}

/**
 * A React Error Boundary component that catches JavaScript errors anywhere
 * in its child component tree, logs those errors, and displays a fallback UI.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    };
    console.error("ErrorBoundary caught an error:", errorDetails);

    // Optionally, send to a service:
    // sendErrorToTrackingService(errorDetails);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center h-full p-4 border border-dashed border-destructive rounded-lg bg-destructive/10">
          <p className="text-destructive">Something went wrong. Please try refreshing.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 