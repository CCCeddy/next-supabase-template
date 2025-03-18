'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

// You would typically import your error reporting service here
// import * as Sentry from "@sentry/nextjs";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Report to error logging service
    this.reportError(error, errorInfo);

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.group('Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.groupEnd();
    }
  }

  private reportError(error: Error, errorInfo: ErrorInfo) {
    // Example Sentry implementation:
    // Sentry.captureException(error, {
    //   extra: {
    //     errorInfo: errorInfo,
    //     state: this.state
    //   }
    // });

    // For now, just log to console in production
    if (process.env.NODE_ENV === 'production') {
      console.error({
        error,
        errorInfo,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      });
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorFallback error={this.state.error} resetError={this.handleReset} />
        )
      );
    }

    return this.props.children;
  }
}
