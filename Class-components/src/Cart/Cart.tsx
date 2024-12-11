import { Iindex, Iresponse } from '../interfases/interfases';
import './Cart.scss';
import { ChangeEvent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { add, remove } from '../store/reduser';
import { Contex } from '../contex/contex';
import '../old_app/light.scss';
import { Link } from '@remix-run/react';

const Cart: React.FC<Iindex> = ({ response, index, isChecked, toogle }) => {
  const dispath = useDispatch();
  const queryParams = new URLSearchParams(location.search.split('?')[1]);
  const contex = useContext(Contex);
  const { theme } = contex;
  const checked = (event: ChangeEvent<HTMLInputElement>) => {
    toogle(index);
    if (event.target.checked) {
      dispath(add(response as Iresponse));
    } else {
      dispath(remove(response as Iresponse));
    }
  };

  return (
    <Link to={`/details/${index}?${queryParams}`} className="link">
      <div className={`cart ${theme ? '' : 'black'}`}>
        <p>name: {(response as Iresponse).name}</p>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={checked}
          className="check"
        />
      </div>
    </Link>
  );
};

export default Cart;
