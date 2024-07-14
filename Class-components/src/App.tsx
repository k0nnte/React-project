import React, { useEffect } from 'react';
import Search from './Search/Search';
import Response from './response/Repsonse';
import '../src/App.scss';
import ErrorBoundary from './Error/Error';
import useLocalStorage from './interfases/hooks';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ErrorCart from './Error/ErrorCart';

const App: React.FC = () => {
  const [searchText, setSearchText] = useLocalStorage('text');
  const navigate = useNavigate();
  const handleSearch = (newText: string) => {
    setSearchText(newText);
    navigate('/');
  };
  useEffect(() => {
    setSearchText(searchText);
  }, [searchText, setSearchText]);

  const MainContent: React.FC<{
    searchText: string;
    handleSearch: (newText: string) => void;
  }> = ({ searchText, handleSearch }) => (
    <>
      <div className="top">
        <Search onSearch={handleSearch} />
      </div>
      <div className="bottom">
        <Routes>
          <Route path="*" element={<Response search={searchText} />} />
          <Route
            path="/page/:page?"
            element={<Response search={searchText} />}
          />
          <Route
            path="/details/:id"
            element={<Response search={searchText} />}
          />
        </Routes>
      </div>
    </>
  );
  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route
            path="*"
            element={
              <MainContent
                searchText={searchText}
                handleSearch={handleSearch}
              />
            }
          />
          <Route
            path="/page/:page?/*"
            element={
              <MainContent
                searchText={searchText}
                handleSearch={handleSearch}
              />
            }
          />
          <Route path="/*" element={<ErrorCart />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
