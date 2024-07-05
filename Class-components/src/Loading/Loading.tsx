import { Component, ReactNode } from 'react';
import gif from '../assets/await.gif';

class Loading extends Component {
  render(): ReactNode {
    return (
      <div>
        <img src={gif} alt="loading" />
      </div>
    );
  }
}

export default Loading;
