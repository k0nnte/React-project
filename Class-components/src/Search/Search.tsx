import { Component, ReactNode } from 'react';
import '../Search/Search.scss';
import { Istate } from '../interfases/interfases';

interface IonSearch {
  onSearch: (newText: string) => void;
}

class Search extends Component<IonSearch, Istate> {
  constructor(props: IonSearch) {
    super(props);
    this.state = {
      inputInfo: localStorage.getItem('text') || '',
      err: false,
    };
  }

  inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputInfo: event.target.value });
  };

  clickBtn = () => {
    localStorage.setItem('text', this.state.inputInfo.trim());
    this.props.onSearch(this.state.inputInfo.trim());
  };
  clickErr = () => {
    this.setState({ err: true });
  };

  render(): ReactNode {
    if (this.state.err) {
      throw new Error('Click error');
    }
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
        <button onClick={this.clickErr}>Throw ERROR</button>
      </div>
    );
  }
}

export default Search;
