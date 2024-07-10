import { useState, useEffect } from 'react';
import { Iobject, Irequest } from '../interfases/interfases';
import Cart from '../Cart/Cart';
import '../response/Repsonse.scss';
import Loading from '../Loading/Loading';
import request from './request';

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

  const fetchData = async (searchQuery: string) => {
    try {
      setIsLoad(true);
      const data = await request(searchQuery);
      setMas(data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchData(search);
  }, [search]);

  if (isError) {
    return <div className="error">Ошибка загрузки</div>;
  }
  return (
    <div className="wrapbottom">
      {isLoad ? (
        <Loading />
      ) : mas.results.length === 0 ? (
        <div className="error">Not Found</div>
      ) : (
        mas.results.map((item, index) => {
          return <Cart key={index} response={item} />;
        })
      )}
    </div>
  );
};

export default Response;
