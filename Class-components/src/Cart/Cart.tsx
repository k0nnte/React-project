import React from 'react';
import { Icart, Iresponse } from '../interfases/interfases';
import '../Cart/Cart.scss';
import { useLocation, useNavigate } from 'react-router-dom';

interface Iindex extends Icart {
  index: number;
}

const Cart: React.FC<Iindex> = ({ response, index }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clickDiv = () => {
    navigator(`/details/${index}?${queryParams}`);
  };

  return (
    <div className="cart" onClick={clickDiv}>
      <p>name: {(response as Iresponse).name}</p>
    </div>
  );
};

export default Cart;
