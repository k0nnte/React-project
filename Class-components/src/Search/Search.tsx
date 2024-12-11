import React, { useContext } from 'react';
import useLocalStorage from '../interfases/hooks';
import { Contex } from '../contex/contex';
import { IonSearch } from '../interfases/interfases';
import './Search.scss';

const Search: React.FC<IonSearch> = ({ onSearch }) => {
  const [inputInfo, setValueState, saveToLocalStorage] =
    useLocalStorage('text');
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

  return (
    <>
      <div className="wrapTop">
        <input
          type="text"
          value={inputInfo}
          placeholder="введите запрос"
          onChange={inputChange}
          className="input"
        />
        <button onClick={clickBtn}>Search</button>
        {/* <button onClick={clickErr}>Throw ERROR</button> */}
      </div>
      <div className="ligth">
        <button className="ligth_btn" onClick={setligth}>
          togle theme
        </button>
      </div>
    </>
  );
};

export default Search;
