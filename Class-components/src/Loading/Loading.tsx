import { Component, ReactNode } from 'react';
import gif from '../assets/await.gif';
import './Loading.scss';

class Loading extends Component {
  render(): ReactNode {
    return (
      <div className="wrapper_image">
        <img src={gif} alt="loading" className="image" />
      </div>
    );
  }
}

export default Loading;
