import React from 'react';
import gif from '../assets/await.gif';
import './Loading.scss';

const Loading: React.FC = () => {
  return (
    <div className="wrapper_image">
      <img src={gif} alt="loading" className="image" />
    </div>
  );
};

export default Loading;
