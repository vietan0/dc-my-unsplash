import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ImagesContextProvider from './contexts/ImagesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ImagesContextProvider>
      <App />
    </ImagesContextProvider>
  </React.StrictMode>,
);
