import { useNavigate } from 'react-router-dom';

const ErrorCart: React.FC = () => {
  const navigate = useNavigate();
  const clickBack = () => {
    navigate(`/`);
  };

  return (
    <div>
      <h1>404 PAGE NOT FAUND</h1>
      <button onClick={clickBack}>Main</button>
    </div>
  );
};

export default ErrorCart;
