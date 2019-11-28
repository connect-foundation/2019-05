import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FilterProvider } from './contexts/Filter/Context';
import App from './App';

const Root = () => (
  <BrowserRouter>
    <FilterProvider>
      <App />
    </FilterProvider>
  </BrowserRouter>
);

export default Root;
