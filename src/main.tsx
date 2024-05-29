import { ToastContainer, ReactDOM } from './import/import-libary.js';
import ShopContextProvider from './context/ShopContext.js';
import React from 'react';
import App from './App.js';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ShopContextProvider>
      <App />
      <ToastContainer />
    </ShopContextProvider>
  </React.StrictMode>
);
