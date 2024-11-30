import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Cart from '../Cart/Cart';
import { Iobject } from '../interfases/interfases';
import Loading from '../Loading/Loading';
import '../response/Repsonse.scss';
import { useGetAllPeopleQuery } from './request';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { distroyer } from '../store/reduser';
import { saveAs } from 'file-saver';
import { Contex } from '../contex/contex';

const Response: React.FC<Iobject> = ({ search }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || '1';
  const contex = useContext(Contex);
  const { theme } = contex;

  const [cheked, setcheked] = useState<{ [key: string]: boolean }>({});

  const toogle = (index: number) => {
    const key = `${index}_${page}`;
    setcheked((prevstate) => ({
      ...prevstate,
      [key]: !prevstate[key],
    }));
  };

  const resetChecked = () => {
    const newChecked = Object.keys(cheked).reduce(
      (acc, key) => {
        acc[key] = false;
        return acc;
      },
      {} as { [key: string]: boolean }
    );

    setcheked(newChecked);
  };

  const reset = () => {
    dispatch(distroyer());
    resetChecked();
  };

  const { data, isLoading, isSuccess, isError, isFetching } =
    useGetAllPeopleQuery([search, page]);

  const handlePreviousPage = () => {
    const prevPage = page ? +page - 1 : 1;
    navigate(`?page=${prevPage}`);
  };
  const clickrez = () => {
    const currentPath = location.pathname;
    const detailsRegex = /\/details\/\d+/;
    if (detailsRegex.test(currentPath)) {
      navigate(`/?${queryParams}`);
    }
  };
  const handleNextPage = () => {
    const nextPage = page ? +page + 1 : 2;
    navigate(`?page=${nextPage}`);
  };

  const save = () => {
    const rez = JSON.stringify(store);
    const blob = new Blob([rez], { type: 'application/json' });
    saveAs(blob, `${store.length}_peoples.csv`);
  };

  if (isError) {
    return <div>Ошибка</div>;
  }
  if (isLoading) {
    return <Loading />;
  }

  if (isFetching) {
    return <Loading />;
  }

  if (isSuccess) {
    return (
      <>
        <div className="response">
          <div className="wrapbottom">
            <div className="results" onClick={clickrez}>
              {data!.results.map((item, index) => (
                <Cart
                  key={index}
                  response={item}
                  index={index}
                  isChecked={!!cheked[`${index}_${page}`]}
                  toogle={toogle}
                />
              ))}
            </div>
            {data!.count > 10 && (
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
                  disabled={
                    page ? +page === Math.ceil(data!.count / 10) : false
                  }
                >
                  next
                </button>
              </div>
            )}
          </div>
          <Outlet />
        </div>
        <div
          className={`out ${store.length > 0 ? 'open' : ''} ${theme ? '' : 'black'}`}
        >
          <p>{store.length} items are selected</p>
          <div className="buttons">
            <button onClick={reset} className="btn">
              Unselect all
            </button>
            <button onClick={save} className="btn">
              Download
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default Response;
