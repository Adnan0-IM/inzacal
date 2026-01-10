import React from "react";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("Auth UI ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="p-4 text-sm text-red-700 bg-red-50 rounded-md"
        >
          Something went wrong loading authentication UI. Please reload.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary