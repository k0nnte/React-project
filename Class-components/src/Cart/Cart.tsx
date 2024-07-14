import React from 'react';
import { Icart, Iresponse } from '../interfases/interfases';
import '../Cart/Cart.scss';

interface Iindex extends Icart {
  index: number;
}

const Cart: React.FC<Iindex> = ({ response, index }) => {
  const clickDiv = () => {
    console.log(index);
  };

  return (
    <div className="cart" onClick={clickDiv}>
      <p>name: {(response as Iresponse).name}</p>
      <p>height: {(response as Iresponse).height}</p>
      <p>mass: {(response as Iresponse).mass}</p>
      <p>hair_color: {(response as Iresponse).hair_color}</p>
      <p>skin_color: {(response as Iresponse).skin_color}</p>
      <p>eye_color: {(response as Iresponse).eye_color}</p>
      <p>birth_year: {(response as Iresponse).birth_year}</p>
      <p>gender: {(response as Iresponse).gender}</p>
    </div>
  );
};

export default Cart;
