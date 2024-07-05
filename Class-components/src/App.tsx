import { Component } from 'react';
import Search from './Search/Search';
import Response from './response/Repsonse';
import '../src/App.scss';
import ErrorBoundary from './Error/Error';

interface IInputvalueState {
  searchText: string;
}

class App extends Component<object, IInputvalueState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchText: localStorage.getItem('text') || '',
    };
  }

  handSearch = (newText: string) => {
    this.setState({ searchText: newText });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <div className="top">
            <Search onSearch={this.handSearch} />
          </div>
          <div className="bottom">
            <Response search={this.state.searchText} />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
