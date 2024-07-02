import { Component } from 'react';
import Search from './Search/Search';
import Response from './response/Repsonse';

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
      <div>
        <div className="top">
          <Search onSearch={this.handSearch} />
        </div>
        <div className="bottom">
          <Response search={this.state.searchText} />
        </div>
      </div>
    );
  }
}

export default App;
