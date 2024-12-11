import React from 'react';
// import gif from '../../public/await.gif';
import './Loading.scss';

const Loading: React.FC = () => {
  return (
    <div className="wrapper_image">
      <img src="./await.gif" alt="loading" className="image" />
    </div>
  );
};

export default Loading;
