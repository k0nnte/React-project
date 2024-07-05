import { Component, ReactNode } from 'react';
import '../Search/Search.scss';

interface Istate {
  inputInfo: string;
}

interface IonSearch {
  onSearch: (newText: string) => void;
}

class Search extends Component<IonSearch, Istate> {
  constructor(props: IonSearch) {
    super(props);
    this.state = {
      inputInfo: localStorage.getItem('text') || '',
    };
  }

  inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputInfo: event.target.value });
  };

  clickBtn = () => {
    localStorage.setItem('text', this.state.inputInfo.trim());
    this.props.onSearch(this.state.inputInfo.trim());
  };

  render(): ReactNode {
    return (
      <div className="wrapTop">
        <input
          type="text"
          value={this.state.inputInfo}
          placeholder="введите запрос"
          onChange={this.inputChange}
          className="inpyt"
        />
        <button onClick={this.clickBtn}>Search</button>
      </div>
    );
  }
}

export default Search;
