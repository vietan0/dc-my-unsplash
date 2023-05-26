import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import MainContextProvider from './contexts/MainContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </React.StrictMode>,
);
