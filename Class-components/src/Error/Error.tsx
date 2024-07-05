import { Component, ReactNode } from 'react';
import './Error.scss';

interface props {
  children: ReactNode;
}

interface state {
  hasError: boolean;
}

class ErrorBoundary extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.log(error);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="ERROR_wrapper">
          <div className="Error">
            <span className="spanrezerv">Ошибка</span>
            <button onClick={this.handleReset} className="btnReset">
              Reset
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
