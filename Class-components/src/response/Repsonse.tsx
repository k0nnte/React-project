import { useState, useEffect } from 'react';
import { Iobject, Irequest } from '../interfases/interfases';
import Cart from '../Cart/Cart';
import '../response/Repsonse.scss';
import Loading from '../Loading/Loading';
import request from './request';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const obj = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

const Response: React.FC<Iobject> = ({ search }) => {
  const [mas, setMas] = useState<Irequest>(obj);
  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || '1';

  const fetchData = async (searchQuery: string, param: string = '1') => {
    try {
      setIsLoad(true);
      const data = await request(searchQuery, param);
      setMas(data);
      setIsError(false);
      setErrorText('');
    } catch (error) {
      setIsError(true);
      setErrorText((error as Error).message || 'Ошибка загрузки данных');
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchData(search, page);
  }, [page, search]);

  const handlePreviousPage = () => {
    const prevPage = page ? +page - 1 : 1;
    navigate(`?page=${prevPage}`);
  };

  const handleNextPage = () => {
    const nextPage = page ? +page + 1 : 2;
    navigate(`?page=${nextPage}`);
  };

  if (isError) {
    return <div className="error">{errorText.toUpperCase()}</div>;
  }

  if (isLoad) {
    return <Loading />;
  }
  if (mas.results.length === 0) {
    return <div className="error">Not Found</div>;
  }

  const clickrez = () => {
    const currentPath = location.pathname;
    const detailsRegex = /\/details\/\d+/;
    if (detailsRegex.test(currentPath)) {
      const newPath = currentPath.replace(detailsRegex, '');
      navigate(newPath);
    }
  };

  return (
    <>
      <div className="wrapbottom">
        <div className="results" onClick={clickrez}>
          {mas.results.map((item, index) => (
            <Cart key={index} response={item} index={index} />
          ))}
        </div>
        {mas.count > 10 && (
          <div className="pagination">
            <button
              className="btnclick"
              onClick={handlePreviousPage}
              disabled={page ? +page === 1 : true}
            >
              prev
            </button>
            <button
              className="btnclick"
              onClick={handleNextPage}
              disabled={page ? +page === Math.ceil(mas.count / 10) : false}
            >
              next
            </button>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Response;
