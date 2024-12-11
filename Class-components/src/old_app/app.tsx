import { useContext } from 'react';
import { Contex } from '../contex/contex';
import useLocalStorage from '../interfases/hooks';
import './App.scss';
import './light.scss';
import { useNavigate } from '@remix-run/react';
import Search from '../Search/Search';
import Response from '../Response/Repsonse';

const App = ({ children }) => {
  const contex = useContext(Contex);
  const { theme } = contex;
  const [, setSearchText] = useLocalStorage('text');
  const router = useNavigate();
  const handleSearch = (newText: string) => {
    setSearchText(newText);
    router(`/?search=${newText}`);
  };
  return (
    <div className={`app ${theme ? '' : 'black'}`}>
      <div className={`top ${theme ? '' : 'black'}`}>
        <Search onSearch={handleSearch} />
      </div>
      <div className={`bottom ${theme ? '' : 'black'}`}>
        <Response children={children} />
      </div>
    </div>
  );
};

export default App;
