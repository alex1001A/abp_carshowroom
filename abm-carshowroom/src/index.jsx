import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CarProvider } from './components/context/CarContext';

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CarProvider>
      <App />
    </CarProvider>
  </BrowserRouter>
);
