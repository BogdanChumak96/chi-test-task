import { ErrorBoundaryProps, ErrorBoundaryState } from "../../types";
import { Component, ErrorInfo } from "react";
import styles from "./styles.module.scss";

interface CustomErrorBoundaryState extends ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  CustomErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error_message}>
          Error occurred: {this.state.error && this.state.error.toString()}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
