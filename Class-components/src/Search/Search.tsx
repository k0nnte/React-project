'use clinet';
import React, { useContext, useState } from 'react';
import style from './Search.module.scss';
import useLocalStorage from '../interfases/hooks';
import { Contex } from '../contex/contex';
import { IonSearch } from '../interfases/interfases';

const Search: React.FC<IonSearch> = ({ onSearch }) => {
  const [inputInfo, setValueState, saveToLocalStorage] =
    useLocalStorage('text');
  const [err, setErr] = useState<boolean>(false);
  const contex = useContext(Contex);
  const { theme, setTheme } = contex;

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueState(event.target.value);
  };

  const setligth = () => {
    setTheme(!theme);
  };

  const clickBtn = () => {
    saveToLocalStorage(inputInfo.trim());

    onSearch(inputInfo.trim());
  };

  const clickErr = () => {
    setErr(true);
  };

  if (err) {
    throw new Error('Click error');
  }

  return (
    <>
      <div className={style.wrapTop}>
        <input
          type="text"
          value={inputInfo}
          placeholder="введите запрос"
          onChange={inputChange}
          className={style.input}
        />
        <button onClick={clickBtn}>Search</button>
        <button onClick={clickErr}>Throw ERROR</button>
      </div>
      <div className={style.ligth}>
        <button className={style.ligth_btn} onClick={setligth}>
          togle theme
        </button>
      </div>
    </>
  );
};

export default Search;
