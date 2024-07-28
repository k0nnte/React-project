import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { TheProvider } from './contex/contex';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <TheProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </TheProvider>
  </Provider>
);
