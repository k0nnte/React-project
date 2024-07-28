import { useNavigate } from 'react-router-dom';
import { Contex } from '../contex/contex';
import { useContext } from 'react';

const ErrorCart: React.FC = () => {
  const navigate = useNavigate();
  const contex = useContext(Contex);
  const { theme } = contex;
  const clickBack = () => {
    navigate(`/`);
  };

  return (
    <div className={`${theme ? 'black' : ''}`}>
      <h1>404 PAGE NOT FAUND</h1>
      <button onClick={clickBack}>Main</button>
    </div>
  );
};

export default ErrorCart;
