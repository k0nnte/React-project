import React, { useState } from 'react';
import '../Search/Search.scss';
import useLocalStorage from '../interfases/hooks';

interface IonSearch {
  onSearch: (newText: string) => void;
}

const Search: React.FC<IonSearch> = ({ onSearch }) => {
  const [inputInfo, setInputInfo, saveToLocalStorage] = useLocalStorage('text');
  const [err, setErr] = useState<boolean>(false);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputInfo(event.target.value);
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
    <div className="wrapTop">
      <input
        type="text"
        value={inputInfo}
        placeholder="введите запрос"
        onChange={inputChange}
        className="inpyt"
      />
      <button onClick={clickBtn}>Search</button>
      <button onClick={clickErr}>Throw ERROR</button>
    </div>
  );
};

export default Search;
