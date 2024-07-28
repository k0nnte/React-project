import { Component, ReactNode } from 'react';
import './Error.scss';
import { props, state } from '../interfases/interfases';
import { Contex } from '../contex/contex';

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
        <Contex.Consumer>
          {(context) => {
            const { theme } = context;

            return (
              <div className={`ERROR_wrapper ${theme ? '' : 'black'}`}>
                <div className="Error">
                  <span className="spanrezerv">Ошибка</span>
                  <button onClick={this.handleReset} className="btnReset">
                    Reset
                  </button>
                </div>
              </div>
            );
          }}
        </Contex.Consumer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
