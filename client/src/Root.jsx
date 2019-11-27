import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FilterProvider } from './contexts/FilterContext';
import App from './App';

const Root = () => (
  <BrowserRouter>
    <FilterProvider>
      <App />
    </FilterProvider>
  </BrowserRouter>
);

export default Root;
