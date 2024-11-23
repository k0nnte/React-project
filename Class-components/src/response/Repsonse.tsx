'use client';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Cart from '../Cart/Cart';
import Loading from '../Loading/Loading';
import style from './Repsonse.module.scss';
import { useGetAllPeopleQuery } from './request';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { distroyer } from '../store/reduser';
import { saveAs } from 'file-saver';
import { useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Contex } from '../contex/contex';
import ligtn from '../light.module.scss';

interface pagechild {
  children: React.ReactNode;
}

const Repsonse: React.FC<pagechild> = ({ children }) => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const contex = useContext(Contex);
  const { theme } = contex;
  const currentPath = usePathname();

  const store = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(searchParams.toString());

  const page = queryParams.get('page') || '1';
  const search = queryParams.get('search');

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
    useGetAllPeopleQuery([search == null ? '' : search, page]);

  const handlePreviousPage = () => {
    const prevPage = page ? +page - 1 : 1;
    queryParams.set('page', prevPage.toString());
    navigate.push(`/?${queryParams.toString()}`);
  };
  const clickrez = () => {
    const detailsRegex = /\/details\/\d+/;

    if (detailsRegex.test(currentPath)) {
      navigate.push(`/?${queryParams.toString()}`);
    }
  };
  const handleNextPage = () => {
    const nextPage = page ? +page + 1 : 2;
    queryParams.set('page', nextPage.toString());
    navigate.push(`/?${queryParams.toString()}`);
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
        <div className={style.response}>
          <div className={style.wrapbottom}>
            <div className={style.results} onClick={clickrez}>
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
              <div className={style.pagination}>
                <button
                  className={style.btnclick}
                  onClick={handlePreviousPage}
                  disabled={page ? +page === 1 : true}
                >
                  prev
                </button>
                <button
                  className={style.btnclick}
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

          {currentPath !== `/` && children}
        </div>
        <div
          className={`${style.out} ${store.length > 0 ? style.open : ``} ${theme ? `` : ligtn.black}`}
        >
          <p>{store.length} items are selected</p>
          <div className={style.buttons}>
            <button onClick={reset} className={style.btn}>
              Unselect all
            </button>
            <button onClick={save} className={style.btn}>
              Download
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default Repsonse;
