import React from 'react';
import gif from '../public/assets/await.gif';
import './Loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className="wrapper_image">
      <img src={gif} alt="loading" className="image" />
    </div>
  );
};

export default Loading;
