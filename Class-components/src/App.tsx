import React, { useState, useEffect } from 'react';
import Search from './Search/Search';
import Response from './response/Repsonse';
import '../src/App.scss';
import ErrorBoundary from './Error/Error';

const App: React.FC = () => {
  const [searchText, setSearchText] = useState(
    localStorage.getItem('text') || ''
  );
  const handleSearch = (newText: string) => {
    setSearchText(newText);
  };
  useEffect(() => {
    localStorage.setItem('text', searchText);
  }, [searchText]);

  return (
    <ErrorBoundary>
      <div className="app">
        <div className="top">
          <Search onSearch={handleSearch} />
        </div>
        <div className="bottom">
          <Response search={searchText} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
