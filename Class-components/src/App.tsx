import React, { useContext, useEffect } from 'react';
import Search from './Search/Search';
import Response from './response/Repsonse';
// import ErrorBoundary from './Error/Error';
import useLocalStorage from './interfases/hooks';
import { Routes, Route, useNavigate } from 'react-router-dom';
// import ErrorCart from '../Error/ErrorCart';
import About from './About/About';
import './light.module.scss';
import { Contex } from './contex/contex';

const App: React.FC = () => {
  const [searchText, setSearchText] = useLocalStorage('text');
  const navigate = useNavigate();
  const handleSearch = (newText: string) => {
    setSearchText(newText);
    navigate(`/?search=${newText}`);
  };
  useEffect(() => {
    setSearchText(searchText);
  }, [searchText, setSearchText]);

  const contex = useContext(Contex);
  const { theme } = contex;

  return (
    // <ErrorBoundary>
    <div className={`app ${theme ? '' : 'black'}`}>
      <div className={`top ${theme ? '' : 'black'}`}>
        <Search onSearch={handleSearch} />
      </div>
      <div className={`bottom ${theme ? '' : 'black'}`}>
        <Routes>
          <Route path="/" element={<Response search={searchText} />}>
            <Route path="/details/:id" element={<About />} />
          </Route>
          {/* <Route path="/*" element={<ErrorCart />} /> */}
        </Routes>
      </div>
    </div>
    // </ErrorBoundary>
  );
};

export default App;
