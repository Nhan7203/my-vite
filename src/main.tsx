
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { ToastContainer } from 'react-toastify';
import ShopContextProvider from './context/ShopContext.js';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ShopContextProvider>
      <App />
      <ToastContainer />
    </ShopContextProvider>
  </React.StrictMode>
);
