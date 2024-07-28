import { Iindex, Iresponse } from '../interfases/interfases';
import '../Cart/Cart.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { add, remove } from '../store/reduser';
import { Contex } from '../contex/contex';

const Cart: React.FC<Iindex> = ({ response, index, isChecked, toogle }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const dispath = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const contex = useContext(Contex);
  const { theme } = contex;
  const clickDiv = () => {
    if (event?.target instanceof HTMLInputElement) {
      return;
    }
    navigator(`/details/${index}?${queryParams}`);
  };

  const checked = (event: ChangeEvent<HTMLInputElement>) => {
    toogle(index);
    if (event.target.checked) {
      dispath(add(response as Iresponse));
    } else {
      dispath(remove(response as Iresponse));
    }
  };

  return (
    <div className={`cart ${theme ? '' : 'black'}`} onClick={clickDiv}>
      <p>name: {(response as Iresponse).name}</p>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={checked}
        className="check"
      />
    </div>
  );
};

export default Cart;
