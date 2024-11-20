import React from 'react';
import gif from '../public/assets/await.gif';
import style from './Loading.module.scss';
import Image from 'next/image';

const Loading: React.FC = () => {
  return (
    <div className={style.wrapper_image}>
      <Image
        src={gif}
        alt="loading"
        className={style.image}
        layout="responsive"
        width={500}
        height={500}
      />
    </div>
  );
};

export default Loading;
