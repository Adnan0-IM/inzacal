import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

type ErrorBoundaryProps = {
  children?: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  // Called when an error occurs in a child component
  static getDerivedStateFromError(_error: unknown): ErrorBoundaryState {
    void _error;
    return { hasError: true };
  }

  // Called after an error is caught, allows for logging error details
  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("An error occurred:", error);
    console.error("Error details:", info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <h1>Something went wrong. Please try again later.</h1>
        )
      );
    }

    // Render child components normally if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
