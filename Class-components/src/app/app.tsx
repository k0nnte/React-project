'use client';
import React, { useContext } from 'react';
import { Contex } from '../contex/contex';
import Search from '../Search/Search';
import useLocalStorage from '../interfases/hooks';
import style from '../light.module.scss';
import { useRouter } from 'next/navigation';
import Response from '../response/Repsonse';

interface pagetype {
  children: React.ReactNode;
}

const App: React.FC<pagetype> = ({ children }) => {
  const contex = useContext(Contex);
  const { theme } = contex;
  const [, setSearchText] = useLocalStorage('text');
  const router = useRouter();
  const handleSearch = (newText: string) => {
    setSearchText(newText);
    router.push(`/?search=${newText}`);
  };
  return (
    <div className={`app ${theme ? '' : style.black}`}>
      <div className={`top ${theme ? '' : style.black}`}>
        <Search onSearch={handleSearch} />
      </div>
      <div className={`bottom ${theme ? '' : style.black}`}>
        <Response children={children} />
      </div>
    </div>
  );
};

export default App;
