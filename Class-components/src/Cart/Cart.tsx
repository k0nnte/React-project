import { Iindex, Iresponse } from '../interfases/interfases';
import style from './Cart.module.scss';
import { ChangeEvent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { add, remove } from '../store/reduser';
import { Contex } from '../contex/contex';
import { useRouter } from 'next/router';
import styleligth from '../light.module.scss';
import Link from 'next/link';

const Cart: React.FC<Iindex> = ({ response, index, isChecked, toogle }) => {
  const navigator = useRouter();
  const dispath = useDispatch();
  const queryParams = new URLSearchParams(navigator.asPath.split('?')[1]);
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
    <Link href={`/details/${index}?${queryParams}`} className="link">
      <div className={`${style.cart} ${theme ? '' : styleligth.black}`}>
        <p>name: {(response as Iresponse).name}</p>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={checked}
          className={style.check}
        />
      </div>
    </Link>
  );
};

export default Cart;
