import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FilterProvider } from './contexts/Filter/Context';
import { SideBarProvider } from './contexts/SideBar/Context';
import App from './App';

const Root = () => (
  <BrowserRouter>
    <SideBarProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </SideBarProvider>
  </BrowserRouter>
);

export default Root;
